<?php

function getTemps(){
	require_once "mysqli_connect.php";

// Make the query:
	$q = "SELECT * FROM temperature ORDER BY id ASC";
// Run the query.
	$query = @mysqli_query ($dbc, $q);

	$results = array();

// If it ran OK, display therecords.
	if ($query) { 
// Fetch and print all the records:
		while ($row = mysqli_fetch_array($query,MYSQLI_ASSOC)) {
			$milliseconds = 1000 * strtotime($row['timestamp']);
			$float_value_of_var = floatval($row['temperature']);
			$results[] = array( $milliseconds, $float_value_of_var );
		}

		return $results;


} else { // If it did not run OK.

 //Debugging message:
	echo '<p>' . mysqli_error($dbc) . '<br/><br />Query: ' . $q . '</p>';

} 
mysqli_free_result ($query); 
mysqli_close($dbc);
}


function getBuienradarData(){
	require_once "mysqli_connect.php";

// Make the query:
	$q = "SELECT * FROM buienradar ORDER BY id ASC";
// Run the query.
	$query = @mysqli_query ($dbc, $q);

	$results = array();

// If it ran OK, display the records.
	if ($query) { 
// Fetch and print all the records:
		while ($row = mysqli_fetch_array($query,MYSQLI_ASSOC)) {
			$milliseconds = 1000 * strtotime($row['Date']);
			$temperature = floatval($row['Temperature']);
			$humidity = floatval($row['Humidity']);
			$wind_speed_MS = floatval($row['Wind_speed_MS']);
			$wind_speed_BF = floatval($row['Wind_speed_BF']);
			$wind_direction_DEG	 = floatval($row['Wind_direction_DEG']);
			$air_pressure	 = floatval($row['Air_pressure']);
			$sight_meters	 = floatval($row['Sight_meters']);
			$squall_MS	 = floatval($row['Squall_MS']);
			$rain_MMPH	 = floatval($row['Rain_MMPH']);
			$results[] = array( $milliseconds, $temperature, $humidity,$wind_speed_MS,$wind_speed_BF,$wind_direction_DEG,$air_pressure,$sight_meters,$squall_MS,$rain_MMPH);
		}

		return $results;


} else { // If it did not run OK.

 //Debugging message:
	echo '<p>' . mysqli_error($dbc) . '<br/><br />Query: ' . $q . '</p>';

} 
mysqli_free_result ($query); 
mysqli_close($dbc);
}
?>

