<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = ["message" => "Hello from PHP via axios!"];
echo json_encode($data);
