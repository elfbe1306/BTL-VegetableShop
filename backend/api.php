<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET");

require_once "db.php";
require_once "controllers/posts.php";
require_once "controllers/products.php";
require_once "controllers/reviews.php";
require_once "controllers/promotions.php";
require_once "controllers/user.php";

require_once "controllers/faqs.php";
require_once "controllers/about.php";
require_once "controllers/team.php";

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
        case 'fetchquestions':
            echo json_encode(fetchQuestions($conn));
            break;

        case 'fetchinfo':
            echo json_encode(fetchInfo($conn));
            break;
        
        case 'fetchteam':
            echo json_encode(fetchTeam($conn));
            break;

        case 'fetchadminAccount':
            echo json_encode(fetchAdminAccount($conn));
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
        case 'fetchproductexceptone':
            if(isset($data['productID'])) {
                echo json_encode(FetchAllProductExceptOne($conn, $data['productID']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing product id"]);
            }
            break;
        case 'fetchreviewbyid':
            if(isset($data['productID'])) {
                echo json_encode(fetchReviewByID($conn, $data['productID']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing product id"]);
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
        case 'checkroleuser':
            if(isset($data['userID'])) {
                echo json_encode(checkRole($conn, $data['userID']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing user id"]);
            }
            break;
        case 'createreviewproduct':
            if(isset($data)) {
                echo json_encode(CreateReviewByProductID(
                    $conn, $data['userID'],$data['productID'],$data['review'], $data['rating']
                ));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing review data"]);
            }
            break;

        case 'createquestion':
            if (isset($data['question']) && isset($data['answer'])) {
                echo json_encode(createQuestion($conn, $data['question'], $data['answer']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing question or answer"]);
            }
            break;

        case 'deletequestion':
            if (isset($data['questionID'])) {
                echo json_encode(deleteQuestion($conn, (int)$data['questionID']));
            } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing question ID"]);
                }
            break;
                
        case 'updatequestion':
            if (isset($data['questionID'], $data['question'], $data['answer'])) {
                echo json_encode(updateQuestion($conn, (int)$data['questionID'], $data['question'], $data['answer']));
            } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing question update data"]);
            }
            break;
                    
        case 'updateinfo':
            if (isset($_POST['title_id'], $_POST['title'], $_POST['description'])) {
                $img = null;
                    
            if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
                $imgName = uniqid() . "_" . basename($_FILES['img']['name']);
                $uploadDir = __DIR__ . "/uploads/aboutImgs/"; 
                $uploadPath = $uploadDir . $imgName;
                    
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                    
                if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadPath)) {
                    $img = $imgName;
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Upload image failed"]);
                    exit;
                }
            }
            echo json_encode(updateInfo($conn, (int)$_POST['title_id'], $_POST['title'], $_POST['description'], $img));
            } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing update info data"]);
            }
            break;

        case 'deleteinfo':
            if (isset($data['title_id'])) {
                echo json_encode(deleteInfo($conn, (int)$data['title_id']));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing title id"]);
            }
            break;
        
        case 'addteam':
            if (isset($_POST['name'], $_POST['role'])) {
                $img = null;
            if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
                $imgName = uniqid() . "_" . basename($_FILES['img']['name']);
                    $uploadDir = __DIR__ . "/uploads/teams/";
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }
                    $uploadPath = $uploadDir . $imgName;
                    if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadPath)) {
                        $img = $imgName;
                    }
                    }
            
                    echo json_encode(addTeam($conn, $_POST['name'], $_POST['role'], $img));
                } else {
                    http_response_code(400);
                    echo json_encode(["error" => "Missing data for new team member"]);
                }
                break;
            
        case 'updateteam':
            if (isset($_POST['team_id'], $_POST['name'], $_POST['role'])) {
                $img = null;
            if (isset($_FILES['img']) && $_FILES['img']['error'] === UPLOAD_ERR_OK) {
                $imgName = uniqid() . "_" . basename($_FILES['img']['name']);
                $uploadDir = __DIR__ . "/uploads/teams/";
                $uploadPath = $uploadDir . $imgName;
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0775, true);
                }
                if (move_uploaded_file($_FILES['img']['tmp_name'], $uploadPath)) {
                    $img = $imgName;
                } else {
                    http_response_code(500);
                    echo json_encode(["error" => "Upload image failed"]);
                    exit;
                }
            }
            
            echo json_encode(updateTeam($conn, (int)$_POST['team_id'], $_POST['name'], $_POST['role'], $img));
            } else {
                http_response_code(400);
                echo json_encode(["error" => "Missing update info data"]);
            }
            break;
            
            
                    
            
        default:
            http_response_code(404);
            echo json_encode(["error" => "Invalid route"]);
    }
}

?>
