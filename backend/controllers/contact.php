<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function CreateContact($conn, $jwtToken, $userData) {
    $key = "congabietgay";

    $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));
    $userID = $decoded->userId ?? null;

    $sql = "INSERT INTO `contacts` (`customer_id`, `phonenum`, `subject`, `content`) VALUES (?, ?, ?, ?);";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        return "Error: Unable to prepare statement.";
    }

    $stmt->bind_param("isss", $userID, $userData['phonenum'], $userData['subject'], $userData['content']);

    if ($stmt->execute()) {
        return array("message" => "Your question is successfully sent", "success" => true);
    } else {
        return array("error" => $stmt->error, "success" => false);
    }
}
?>