<?php

require_once( "util.php" );
#require_once( dirname(__FILE__)."/../../php/Snoopy.class.inc" );

#ignore_user_abort(true);
set_time_limit(0);

if(isset($_REQUEST["label"]))
{
	$label = function_exists('mb_strtolower')
		? mb_strtolower(rawurldecode($_REQUEST["label"]), 'utf-8')
		: strtolower(rawurldecode($_REQUEST["label"]));
	#
	$p = explode("/", $label);
	$label = ($p[1] && in_array($p[1], array('film','films','films2','films3','game','games','movie','movies','music','porn','porno','xxx','serial','serials','serials2','serials3','video','2tb','640'))) ? $p[1] : $p[0];
	#

	$name = dirname(__FILE__)."/../images/labels/".$label.".png";
	if(is_readable($name))
	{
		sendFile( $name, "image/png" );
		exit;
	}
}

if(isset($_REQUEST["tracker"]))
{
	$tracker = rawurldecode($_REQUEST["tracker"]);
	$name = dirname(__FILE__)."/../images/trackers/".$tracker.".png";
	if(is_readable($name))
	{
		sendFile( $name, "image/png" );
		exit;
	}
}

header("Status: 302 Moved Temporarily");
header("Location: ../images/trackers/unknown.png");
exit();
