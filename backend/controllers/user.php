<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createAccount($conn, $userData) {
    $hashedPassword = password_hash($userData['password'], PASSWORD_DEFAULT); 

    $sql = "INSERT INTO `userAccount` (`name`, `role`, `email`, `password`) 
            VALUES (?, ?, ?, ?);";

    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        return "Error: Unable to prepare statement.";
    }

    $role = "Customer"; // Default role
    
    $stmt->bind_param('ssss', $userData['name'], $role, $userData['email'], $hashedPassword);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        return "Account created successfully.";
    } else {
        return "Error: Unable to create account.";
    }
}
?>
