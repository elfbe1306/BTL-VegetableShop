<?php
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
    $sql = "SELECT * FROM reviews INNER JOIN userAccount ON reviews.user_id = userAccount.id WHERE product_id = ?;";

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

?>