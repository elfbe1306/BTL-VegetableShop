<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "vegetableshop";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}
?>
