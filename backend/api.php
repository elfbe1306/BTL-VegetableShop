<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

require_once "db.php";
// require_once "controllers/products.php";
// require_once "controllers/reviews.php";
require_once "controllers/posts.php";
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
        case 'fetchpost':
            $id = isset($_GET['postId']) ? (int)$_GET['postId'] : 0;
            if ($id < 1) {
                http_response_code(400);
                echo json_encode(["error"=>"Invalid postId"]);
                break;
            }
            echo json_encode(fetchPostById($conn, $id));
            break;
        case 'fetchpostlist':
            $page   = isset($_GET['page'])  ? max(1, (int)$_GET['page'])  : 1;
            $limit  = isset($_GET['limit']) ? max(1, (int)$_GET['limit']) : 8;
            $offset = ($page - 1) * $limit;
            echo json_encode(fetchPostList($conn, $limit, $offset));
            break;
        case 'fetchtags':
            echo json_encode(fetchAllTags($conn));
            break;
        case 'searchposts':
            $query = isset($_GET['query']) ? trim($_GET['query']) : '';
            if ($query === '') {
                echo json_encode([]); 
            } else {
                echo json_encode(searchPosts($conn, $query));
            }
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
        case 'login':
            if (isset($data)) {
                echo json_encode(Login($conn, $data));
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
