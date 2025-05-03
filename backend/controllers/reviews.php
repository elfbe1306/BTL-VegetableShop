<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
function fetchAllReviews($conn) {
    $sql = "SELECT reviews.*, userAccount.name, userAccount.role\n"
    . "FROM reviews\n"
    . "INNER JOIN userAccount ON reviews.user_id = userAccount.id;";

    $result = $conn->query($sql);

    $reviews = [];

    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }

    return $reviews;
}

function fetchReviewByID($conn, $productID) {
    $sql = "SELECT 
    reviews.id,
    reviews.product_id,
    reviews.comment,
    reviews.star,
    userAccount.name,
    userAccount.role,
    userAccount.email
FROM reviews
INNER JOIN userAccount ON reviews.user_id = userAccount.id
WHERE reviews.product_id = ?;
";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productID);
    $stmt->execute();
    $result = $stmt->get_result();

    $reviews = []; 

    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }

    return $reviews;
}

function CreateReviewByProductID($conn, $userID, $productID, $review, $rating) {
    $sql = "INSERT INTO `reviews` (`product_id`, `user_id`, `comment`, `star`) VALUES (?, ?, ?, ?);";

    $key = "congabietgay";
    $decoded = JWT::decode($userID, new Key($key, 'HS256'));
    $id = $decoded->userId ?? null;

    if ($id === null) {
        return array("message" => "Error: Invalid user token.", "success" => false);
    }

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        return "Error: Unable to prepare statement.";
    }

    $stmt->bind_param("iisi", $productID, $id, $review, $rating);

    if ($stmt->execute()) {
        return array("message" => "Review added successfully.", "success" => true);
    } else {
        return "Error: " . $stmt->error;
    }
}

function CountTotalReview($conn) {
    $sql = "SELECT COUNT(*) AS total_review FROM reviews;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        return $row['total_review'];
    } else {
        return 0;
    }
}

?>