<?php
  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  function createAccount($conn, $userData) {
    $secret_key = "congabietgay"; 

    $payload = [
      "password" => $userData['password'],
      "iat" => time(),              // issued at
      "exp" => time() + (60 * 60)    // token expires in 1 hour (optional)
    ];

    // // Encode password into JWT
    $jwt = JWT::encode($payload, $secret_key, 'HS256');

    // You can now save $jwt into database instead of plain password
    return $jwt;
  }

?>
