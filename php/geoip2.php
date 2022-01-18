<?php
set_time_limit(0);
require_once( "util.php" );

use MaxMind\Db\Reader;
$reader = new Reader('/var/www/geoip2/GeoLite2-City.mmdb');
$reader2 = new Reader('/var/www/geoip2/GeoLite2-ASN.mmdb');

$offset_local = date('Z');

function isValidCode( $country )
{
	return( !empty($country) && (strlen($country)==2) && !ctype_digit($country[1]) );
}

	$ret = array();

	if(!isset($HTTP_RAW_POST_DATA))
		$HTTP_RAW_POST_DATA = file_get_contents("php://input");
	if(isset($HTTP_RAW_POST_DATA))
	{

		$vars = explode('&', $HTTP_RAW_POST_DATA);
		foreach($vars as $var)
		{
			$parts = explode("=",$var);
			if($parts[0]=="ip")
			{
				$ip = trim($parts[1]);
				$ip1 = trim($ip, '[]');

				if(filter_var($ip1, FILTER_VALIDATE_IP))
				{
					$city = array();

						$country = '';

						$record = $reader->get($ip1);
						$country = isset($record['country']['iso_code']) ? $record['country']['iso_code'] : '';
						$name = isset($record['country']['names']['ru']) ? $record['country']['names']['ru'] : '';
						if(empty($name) && isset($record['country']['names']['en'])) $name = $record['country']['names']['en'];
						if(isset($record['city']['names']['ru'])) $city[] = $record['city']['names']['ru'];
						if(empty($city) && isset($record['city']['names']['en'])) $city[] = $record['city']['names']['en'];
						
						if(isset($record['subdivisions'])){
							foreach($record['subdivisions'] as $sub) if(isset($sub['names'])) $city[] = isset($sub['names']['ru']) ? $sub['names']['ru'] : $sub['names']['en'];
						}


						if(!isValidCode($country))
							$country = "un";
						else
						{
							$country = strtolower($country);

						}

							$name = $name ? $name : "неизвестно";

					if(!empty($city)){
                            $city = array_unique($city);
                            $city = implode(', ',$city);
				   }else{
							$city = null;
				   }
                     
                    $asn = $reader2->get($ip1);

                    if(isset($record['location']['time_zone'])){
//						if($dt = new DateTime("now", new DateTimeZone($record['location']['time_zone']))) $timezone = $dt->format('P').' '.$record['location']['time_zone']; else $timezone = $record['location']['time_zone'];
						if($dt_peer = new DateTime(null, new DateTimeZone($record['location']['time_zone']))){
							$offset_peer = $dt_peer->format('Z');
							$diff = ($offset_peer - $offset_local) / 3600;
							$diff = ($diff >= 0) ? '+'.$diff : $diff;
							$timezone = $diff.' '.$record['location']['time_zone'];
						} else $timezone = $record['location']['time_zone'];
					}else{
						$timezone = '-';
					}

					$ret[] = array( "ip"=>$ip, "info"=>array( "country_code"=>$country, "country_name"=>$name, "city"=>$city, "asn"=>isset($asn['autonomous_system_organization'])?$asn['autonomous_system_organization']:"-", "timezone"=>$timezone ) );
				}
			}
		}

	}
	cachedEcho(safe_json_encode($ret),"application/json");
	
