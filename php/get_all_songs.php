<?php
require("sql_connector.php");


$results=mysqli_query($con,"select * from music inner join bands on music.band_id=bands.id") or die(mysqli_error($con));

$ret=array();
while($res=mysqli_fetch_array($results,MYSQLI_ASSOC)){
	array_push($ret,$res);
}

	echo json_encode($ret);
?>