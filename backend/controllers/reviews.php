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
?>