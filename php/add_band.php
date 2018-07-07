<?php
	require("sql_connector.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$results=mysqli_query($con,"insert into bands(band_name,band_cover) values ('".$data["band_name"]."','".$data["image_link"]."')");

	if(strlen($results)==1){
		echo "";
	}else{
		echo "Username is taken.";
	}
?>