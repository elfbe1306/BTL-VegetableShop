<?php
function fetchAllProducts($conn) {
    $sql = "SELECT * FROM products";

    $result = $conn->query($sql);

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    return $products;
}
?>