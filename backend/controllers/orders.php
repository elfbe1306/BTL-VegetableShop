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

  $sql1 = "INSERT INTO `orders` (`total_price`, `shipping_fee`, `finalTotal`, `name`, `phone_number`, `address`, `state`, `zip_code`, `user_id`, `status`) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  $stmt = $conn->prepare($sql1);

  if ($stmt === false) {
      return "Error: Unable to prepare statement.";
  }
  
  $status = "Prepared";
  $stmt->bind_param("dddsssssis", $totalprice, $shippingFee, $finalTotal, $userAddress['name'], $userAddress['phone'], $userAddress['address'], $userAddress['state'], $userAddress['zip'], $userID, $status);

  if ($stmt->execute()) {
      $order_id = $conn->insert_id; 

      $order_response = array("message" => "Order added successfully", "success" => true, "order_id" => $order_id);
  } else {
      return "Error: " . $stmt->error;
  }

  $sql2 = "INSERT INTO `order_product` (`order_id`, `product_id`, `product_name`, `product_price`, `quantity`) VALUES (?, ?, ?, ?, ?)";

  $stmt2 = $conn->prepare($sql2);
  
  if (!$stmt2) {
      return "Error preparing order_product statement: " . $conn->error;
  }
  
  foreach ($orderItem as $item) {
      $product_id = $item['product']['product_id'];
      $product_name = $item['product']['name'];
      $price = (float) $item['product']['price'];
      $quantity = (int) $item['quantity'];
  
      if (isset($item['product']['discount_percentage']) && $item['product']['discount_percentage'] !== null) {
          $discount_percentage = (float) $item['product']['discount_percentage'];
          $discounted_price = $price * (1 - ($discount_percentage / 100));
      } else {
          $discounted_price = $price;
      }
  
      $discounted_price = round($discounted_price, 2);
  
      $stmt2->bind_param("iisdi", $order_id, $product_id, $product_name, $discounted_price, $quantity);
  
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

function FetchCustomerOrders($conn) {
    $sql = "SELECT * 
            FROM `orders`
            INNER JOIN order_product
            ON orders.id = order_product.order_id;";

    $result = $conn->query($sql);

    if (!$result) {
        return ["success" => false, "message" => "Query failed: " . $conn->error];
    }

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orderID = $row['order_id'];

        if (!isset($orders[$orderID])) {
            $orders[$orderID] = [
                "order_id" => $row['order_id'],
                "total_price" => $row['total_price'],
                "shipping_fee" => $row['shipping_fee'],
                "finalTotal" => $row['finalTotal'],
                "name" => $row['name'],
                "phone" => $row['phone_number'],
                "address" => $row['address'],
                "state" => $row['state'],
                "zip_code" => $row['zip_code'],
                "user_id" => $row['user_id'],
                "status" => $row['status'],
                "createdAt" =>$row['createdAt'],
                "list_product" => []
            ];
        }

        $orders[$orderID]['list_product'][] = [
            "product_name" => $row['product_name'],
            "product_price" => $row['product_price'],
            "quantity" => $row['quantity']
        ];
    }

    return ["success" => true, "orders" => array_values($orders)];
}

function ChangeToShipping($conn, $orderID) {
    $sql = "UPDATE orders SET status=? WHERE id=?";

    $newStatus = "Shipping";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $orderID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Shipping"];
}

function ChangeToComplete($conn, $orderID) {
    $sql = "UPDATE orders SET status=? WHERE id=?";

    $newStatus = "Complete";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $orderID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Complete"];
}

function ChangeToPreparing($conn, $orderID) {
    $sql = "UPDATE orders SET status=? WHERE id=?";

    $newStatus = "Preparing";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $orderID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Preparing"];
}

?>