<?php
require("sql_connector.php");


$results=mysqli_query($con,"select * from bands where id=="$_POST["band_id"]) or die(mysqli_error($con));

	echo mysqli_fetch_array($results,MYSQLI_ASSOC);
?>