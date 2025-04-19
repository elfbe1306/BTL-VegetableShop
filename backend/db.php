<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$dbname = "VegetableShop";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
?>
