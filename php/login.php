<?php
	require("sql_connector.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$pass=hash('sha512',$data["password"]);

	$results=mysqli_query($con,"select * from users where username='".$data["username"]."' and password='".$pass."'");
	if(mysqli_num_rows($results)==1){
		echo "";
	}else{
		echo "Wrong username or password.";
	}
?>