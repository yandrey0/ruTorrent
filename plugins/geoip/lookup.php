<?php
	set_time_limit(0);
	require_once( '../../php/util.php' );
	require_once( "sqlite.php" );
	eval( getPluginConf( 'geoip' ) );
	use MaxMind\Db\Reader;
	$reader = new Reader('/var/www/geoip2/GeoLite2-City.mmdb');
	$reader2 = new Reader('/var/www/geoip2/GeoLite2-ASN.mmdb');

	function isValidCode( $country )
	{
		return( !empty($country) && (strlen($country)==2) && !ctype_digit($country[1]) );
	}

//	$retrieveCountry = ($retrieveCountry && function_exists("geoip_country_code_by_name"));
	$retrieveCountryIPv6 = ($retrieveCountry && function_exists("geoip_country_code_by_name_v6"));
	$retrieveComments = ($retrieveComments && sqlite_exists());
	$ret = array();
	$dns = null;
	if(!isset($HTTP_RAW_POST_DATA))
		$HTTP_RAW_POST_DATA = file_get_contents("php://input");
	if(isset($HTTP_RAW_POST_DATA))
	{
		if($dnsResolver && $retrieveHost)
		{
			$dns = fsockopen("udp://".$dnsResolver, 53);
			$randbase = rand(0, 255) * 256;
			$idx = 0;
		}
		$vars = explode('&', $HTTP_RAW_POST_DATA);
		foreach($vars as $var)
		{
			$parts = explode("=",$var);
			if($parts[0]=="ip")
			{
				$value = trim($parts[1]);
				$value = str_replace(array('[',']'), '', $value);

				if(strlen($value))
				{
					$city = array();
					if($retrieveCountry)
					{
						$country = '';

						$record = $reader->get($value);
						$country = $record['country']['iso_code'] ? $record['country']['iso_code'] : '';
						if($record['city']['names']['ru']) $city[] = $record['city']['names']['ru'];
						if(empty($city) && $record['city']['names']['en']) $city[] = $record['city']['names']['en'];
						
						if($record['subdivisions']){
							foreach($record['subdivisions'] as $sub) if($sub['names']) $city[] = $sub['names']['ru'] ? $sub['names']['ru'] : $sub['names']['en'];
						}

/*						
					        if(geoip_db_avail(GEOIP_CITY_EDITION_REV1) || geoip_db_avail(GEOIP_CITY_EDITION_REV0))
					        {
       					        	$country = @geoip_record_by_name( $value );
       					        	if(!empty($country))
							{
								$c = utf8_encode($country["city"]);
								if(!empty($c))
									$city[] = $c;
       					        		$country = $country["country_code"];
							}
						}
*/
						if(!isValidCode($country))
							$country = "un";
						else
						{
							$country = strtolower($country);

						}
                    			}
					else
						$country = "un";
					if(!empty($city)){
                                               $city = array_unique($city);
                                               $country.=" (".implode(', ',$city).")";
										   }
					$host = $value;
                                        if($retrieveHost)
                                        {
						if($dns) 
						{
							$pkt = pack("n", $randbase + $idx) . "\1\0\0\1\0\0\0\0\0\0";
							$ipmap[$value] = $idx++;
							if (substr($value, 0, 1) == '[')
							{
								$a = '';
								foreach(str_split(inet_pton(substr($value, 1, -1))) as $char) $a .= str_pad(dechex(ord($char)), 2, '0', STR_PAD_LEFT);
								$pkt .= "\1" . implode("\1", str_split(strrev($a))) . "\3ip6\4arpa\0\0\x0C\0\1";
							}
							else
							{
								foreach (array_reverse(explode(".", $value)) as $part)
									$pkt .= chr(strlen($part)) . $part;
								$pkt .= "\7in-addr\4arpa\0\0\x0C\0\1";
							}
							fwrite($dns, $pkt);
							fflush($dns);
							$host = $value;
						} 
						else 
						{
                                                	$host = gethostbyaddr(preg_replace('/^\[?(.+?)\]?$/', '$1', $value));
	                                                if(empty($host) || (strlen($host)<2))
        	                                                $host = $value;
						}
                                        }
                                        $comment = '';
                                        if($retrieveComments)
                                        {
        					require_once( 'ip_db.php' );
        					$db = new ipDB();
        					$comment = $db->get($value);
                                        }
                     
                     $asn = $reader2->get($value);

					$ret[] = array( "ip"=>$value, "info"=>array( "country"=>$country, "host"=>$host, "comment"=>$comment, "asn"=>$asn['autonomous_system_organization']?$asn['autonomous_system_organization']:"-" ) );
				}
			}
		}
		if($dns) 
		{
			stream_set_timeout($dns, $dnsResolverTimeout);
			while($idx && ($buf=@fread($dns, 512))) 
			{
				$pos = 12;
				$ip = array();
				$id = ord($buf[0]) * 256 + ord($buf[1]) - $randbase;
				while($count = ord($buf[$pos++])) 
				{
					if(count($ip) < 4)
						array_unshift($ip, substr($buf, $pos, $count));
					$pos += $count;
				}
				$ip = implode(".", $ip);
				if(substr($buf, $pos, 10) != "\0\x0C\0\1\xC0\x0C\0\x0C\x00\x01")
					continue;
				$idx--;
				$pos += 16;
				$host = array();
				while($count = ord($buf[$pos++])) 
				{
					if($count >= 0xc0) 
					{
						$count = (($count&0x3f) << 8) | ord($buf[$pos]);
						if($count < $pos-1) 
						{
							$pos = $count;
							continue;
						} 
						else 
						{
							$host = false;
							break;
						}
					}
					array_push($host, substr($buf, $pos, $count));
					$pos += $count;
				}
				if($host) 
				{
					$host = implode(".", $host);
					$ret[$id]["info"]["host"] = $host;
				}
			}
			fclose($dns);
		}
	}
	cachedEcho(safe_json_encode($ret),"application/json");
	
