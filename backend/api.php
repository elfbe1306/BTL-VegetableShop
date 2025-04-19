<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db.php";
require_once "controllers/products.php";

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'fetchproducts':
        echo json_encode(fetchAllProducts($conn));
        break;

    default:
        http_response_code(404);
        echo json_encode(["error" => "Invalid route"]);
}

?>
