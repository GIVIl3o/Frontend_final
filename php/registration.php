<?php
	require("sql_connector.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$pass=hash('sha512',$data["password"]);

	$results=mysqli_query($con,"insert into users(username,password) values ('".$data["username"]."','".$pass."')");

	if(strlen($results)==1){
		echo "";
	}else{
		echo "Username is taken.";
	}
?>