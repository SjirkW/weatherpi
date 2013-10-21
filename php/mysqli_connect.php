<?php # Script 8.2 - mysqli_connect.php
// This file contains the database accessinformation.
// This file also establishes a connectionto MySQL
// and selects the database.

// Set the database access information as
constants:
DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD', 'sjirkdb');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'weatherpi');

// Make the connection:
$dbc = @mysqli_connect (DB_HOST, DB_USER,
DB_PASSWORD, DB_NAME) OR die ('Could not
connect to MySQL: ' .
mysqli_connect_error() );
?>