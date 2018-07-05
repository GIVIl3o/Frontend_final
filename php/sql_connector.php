<?php
session_start();

$con = mysqli_connect("localhost","root","","frontend_final");

if (!$con){
	echo "connection error";
	exit;
}