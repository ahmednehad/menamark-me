<?php
 
  $ip="";
  if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}
  
  $emailid = $_GET["mailid"] ;
// Open the text file
	$f = fopen("subscribfile.txt", "a");

	// Write text line
	$emailid .= "\t";
	$emailid .= $ip . "\n";
	
	fwrite($f, $emailid); 

	// Close the text file
	fclose($f);




?>