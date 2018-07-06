<?php
	require("sql_connector.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$results=mysqli_query($con,"insert into playlists(name,username) values ('".$data["name"]."','".$data["user"]."')");

	if(strlen($results)==1){
		$sql="insert into playlists_song_id(playlist_id,song_id) values ";
		foreach ($data["playlist"] as $el)
			$sql=$sql." (".$con->insert_id.",".$el."),";
		$sql=substr($sql,0,-1);
		
		$results=mysqli_query($con,$sql);
		if(strlen($results)==1)
			echo "";
		else 
			echo "error";
	}else{
		echo "Username is taken.";
	}
?>