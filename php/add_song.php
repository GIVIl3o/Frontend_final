<?php
	require("sql_connector.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$results=mysqli_query($con,"insert into music(name,src,band_id,album_id,author) values ('".$data["music_name"]."','".$data["music_src"]."',".
		$data["band_id"].",1,'".$data["author"]."')");

	if(strlen($results)==1){
		echo "";
	}else{
		echo "Username is taken.";
	}
?>