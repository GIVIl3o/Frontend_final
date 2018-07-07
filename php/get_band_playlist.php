<?php
require("sql_connector.php");

$data = json_decode(file_get_contents('php://input'), true);

$results=mysqli_query($con,"select music.id,music.name,music.src,music.author,bands.band_name,bands.band_cover".
	" from music inner join bands on music.band_id=bands.id where bands.id='".$data["band_id"]."'") or die(mysqli_error($con));

$ret=array();
while($res=mysqli_fetch_array($results,MYSQLI_ASSOC)){
	array_push($ret,$res);
}

	echo json_encode($ret);
?>