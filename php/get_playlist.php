<?php
require("sql_connector.php");

$data = json_decode(file_get_contents('php://input'), true);

$results=mysqli_query($con,"select * from playlists_song_id where playlist_id=".$data["playlist"]) or die(mysqli_error($con));

$ret=array();
while($res=mysqli_fetch_array($results,MYSQLI_ASSOC)){
	$new_result=mysqli_query($con,"select music.id,music.name,music.src,bands.band_name,bands.band_cover".
	" from music inner join bands on music.band_id=bands.id where music.id=".$res["song_id"]);

	$cur=mysqli_fetch_array($new_result,MYSQLI_ASSOC);
	array_push($ret,$cur);
}

	echo json_encode($ret);
?>