<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
function CreateCustomerOrder($conn, $jwtToken, $userAddress, $orderItem) {
  $key = "congabietgay";

  $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));
  $userID = $decoded->userId ?? null;

  $totalprice = 0;
  for ($i = 0; $i < count($orderItem); $i++) {
      $price = (float) $orderItem[$i]['product']['price'];
      $discount_percentage = $orderItem[$i]['product']['discount_percentage'];
      $quantity = $orderItem[$i]['quantity'];

      if ($discount_percentage) {
          $discounted_price = $price * (1 - ($discount_percentage / 100));
      } else {
          $discounted_price = $price;
      }
      $totalprice += $discounted_price * $quantity;
  }
  $totalprice = round($totalprice, 2);
  $shippingFee = round($totalprice * 0.1, 2);
  $finalTotal = round($totalprice + $shippingFee, 2);

  $sql1 = "INSERT INTO `orders` (`total_price`, `shipping_fee`, `finalTotal`, `name`, `phone_number`, `address`, `state`, `zip_code`, `user_id`) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

  $stmt = $conn->prepare($sql1);

  if ($stmt === false) {
      return "Error: Unable to prepare statement.";
  }

  $stmt->bind_param("dddsssssi", $totalprice, $shippingFee, $finalTotal, $userAddress['name'], $userAddress['phone'], $userAddress['address'], $userAddress['state'], $userAddress['zip'], $userID);

  if ($stmt->execute()) {
      $order_id = $conn->insert_id; 

      $order_response = array("message" => "Order added successfully", "success" => true, "order_id" => $order_id);
  } else {
      return "Error: " . $stmt->error;
  }

  $sql2 = "INSERT INTO `order_product` (`order_id`, `product_id`, `quantity`) VALUES (?, ?, ?)";

  foreach ($orderItem as $item) {
      $product_id = $item['product']['product_id'];
      $quantity = $item['quantity'];

      $stmt2 = $conn->prepare($sql2);
      $stmt2->bind_param("iii", $order_id, $product_id, $quantity);

      if (!$stmt2->execute()) {
          return "Error inserting order products: " . $stmt2->error;
      }
  }

  return $order_response;
}

function CountTotalSale($conn) {
    $sql = "SELECT 
    SUM(total_price) as total_sale
    FROM orders";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $contacts = [];
        while ($row = $result->fetch_assoc()) {
            $contacts[] = $row;
        }
        return array(
            "message" => "Fetched total sale successfully",
            "success" => true,
            "data" => $contacts
        );
    } else {
        return array(
            "message" => "No order to count",
            "success" => false
        );
    }
}

?>