<?php
  require '../../../vendor/autoload.php';

  use Firebase\JWT\JWT;
  use Firebase\JWT\Key;

  $secret_key = "congabietgay";

  $user = 130628; 

  $payload = array(
    "user_id" => $user,
    "iat" => time(),
    "exp" => time() + 3600  
  );
  
  $jwt = JWT::encode($payload, $secret_key, 'HS256');
  echo "JWT Token: " . $jwt;

?>
