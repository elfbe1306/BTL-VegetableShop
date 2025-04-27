<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createAccount($conn, $userData) {
  $sql = "SELECT id FROM `userAccount` WHERE email = ?";
  $stmt = $conn->prepare($sql);

  if ($stmt === false) {
      return "Error: Unable to prepare statement.";
  }

  $stmt->bind_param('s', $userData['email']);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
      return "Error: Email already exists.";
  }

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
function Login($conn, $userData) {
  $sql = "SELECT id, password, role FROM `userAccount` WHERE email = ?";
  $stmt = $conn->prepare($sql);

  if ($stmt === false) {
      return "Error: Unable to prepare statement.";
  }

  $stmt->bind_param('s', $userData['email']);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows === 0) {
      return array("message" => "Error: User not found.", "permission" => false);
  }

  $userId = null;
  $storedPassword = null;
  $userRole = null;

  $stmt->bind_result($userId, $storedPassword, $userRole);
  $stmt->fetch();

  if (!password_verify($userData['password'], $storedPassword)) {
    return array("message" => "Error: Incorrect password.", "permission" => false);
  }

  $key = "congabietgay";
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;
    $payload = array(
        "iat" => $issuedAt,
        "exp" => $expirationTime,
        "userId" => $userId
    );

    $jwt = JWT::encode($payload, $key, 'HS256');

    return array("message" => "Login successful", "permission" => true, "userID" => $jwt, "role" => $userRole);
}
?>
