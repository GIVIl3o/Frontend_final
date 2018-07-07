<?php
require("sql_connector.php");

$data = json_decode(file_get_contents('php://input'), true);

$results=mysqli_query($con,"select * from playlists where username='".$data["user"]."'") or die(mysqli_error($con));

$ret=array();
while($res=mysqli_fetch_array($results,MYSQLI_ASSOC)){
	array_push($ret,$res);
}

	echo json_encode($ret);
?>