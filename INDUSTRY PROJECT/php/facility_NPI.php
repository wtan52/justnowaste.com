<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'])) {
  header( '502 Bad Gateway', TRUE, 502 );
}
$config = parse_ini_file('/var/opt/db.ini');
$conn = new mysqli($config['servername'],$config['username'],$config['password'],$config['db']);
if (!$conn->connect_error) {
  $sql = "SELECT facility_id, jurisdiction_code, jurisdiction_facility_id, registered_business_name, facility_name, street_address, suburb, postcode, primary_anzsic_class_code, primary_anzsic_class_name, main_activities, reports, Total_Land_Waste_Amount, Total_Air_Point_Waste_Amount, Total_Air_Fugitive_Waste_Amount, Total_Air_Waste_Amount, Total_Water_Waste_Amount FROM facility_NPI";
  $result = $conn->query($sql);

  $data = array();
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
  echo json_encode($data,JSON_INVALID_UTF8_SUBSTITUTE);
}
$conn->close();
?>