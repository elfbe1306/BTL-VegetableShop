<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

require_once "db.php";
require_once "controllers/products.php";
require_once "controllers/reviews.php";
require_once "controllers/promotions.php";
require_once "controllers/user.php";

require_once __DIR__ . '/../backend-library/vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';

    switch ($action) {
        case 'fetchproducts':
            echo json_encode(fetchAllProductsWithDiscountOrNot($conn));
            break;
        case 'fetchreviews':
            echo json_encode(fetchAllReviews($conn));
            break;
        case 'fetchpromotions':
            echo json_encode(fetchPromotions($conn));
            break;
        default:
            http_response_code(404);
            echo json_encode(["error" => "Invalid route"]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';

    // Decode JSON body
    $data = json_decode(file_get_contents("php://input"), true);

    switch ($action) {
        case 'fetchbyname':
            if (isset($data['name'])) {
                echo json_encode(fetchProductByName($conn, $data['name']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing product name"]);
            }
            break;
        case 'createaccount':
            if (isset($data)) {
                echo json_encode(createAccount($conn, $data));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing user data"]);
            }
            break;
        default:
            http_response_code(404);
            echo json_encode(["error" => "Invalid route"]);
    }
}

?>
