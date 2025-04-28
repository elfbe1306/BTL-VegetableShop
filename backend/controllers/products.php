<?php
function fetchAllProductsWithDiscountOrNot($conn) {
    $sql = "SELECT 
    p.id AS product_id,
    s.id AS sale_id,
    p.name,
    p.price,
    p.image,
    p.description,
    p.quantity,
    s.sale_name,
    s.discount_percentage,
    s.created_at,
    COALESCE(SUM(r.star), 0) AS total_star,
    COUNT(r.id) AS total_user
FROM products p
LEFT JOIN sale_products sp ON p.id = sp.product_id
LEFT JOIN sales s ON s.id = sp.sale_id
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY 
    p.id, p.name, p.price, p.image, p.description, p.quantity,
    s.id, s.sale_name, s.discount_percentage, s.created_at
ORDER BY p.id";

    $result = $conn->query($sql);

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $row['product_id'] = (int)$row['product_id'];
        $products[] = $row;
    }

    return $products;
}
function fetchProductByName($conn, $name) {
    $sql = "SELECT 
        p.id AS product_id,
        s.id AS sale_id,
        p.name,
        p.price,
        p.image,
        p.description,
        p.quantity,
        s.sale_name,
        s.discount_percentage,
        s.created_at,
        COALESCE(SUM(r.star), 0) AS total_star,
        COUNT(r.id) AS total_user
    FROM products p
    LEFT JOIN sale_products sp ON p.id = sp.product_id
    LEFT JOIN sales s ON s.id = sp.sale_id
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE p.name = ?
    GROUP BY 
        p.id, p.name, p.price, p.image, p.description, p.quantity,
        s.id, s.sale_name, s.discount_percentage, s.created_at
    ORDER BY p.id";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();

    return $product;
}

function FetchAllProductExceptOne($conn, $productID) {
    $sql = "SELECT 
        p.id AS product_id,
        s.id AS sale_id,
        p.name,
        p.price,
        p.image,
        p.description,
        p.quantity,
        s.sale_name,
        s.discount_percentage,
        s.created_at,
        COALESCE(SUM(r.star), 0) AS total_star,
        COUNT(r.id) AS total_user
    FROM products p
    LEFT JOIN sale_products sp ON p.id = sp.product_id
    LEFT JOIN sales s ON s.id = sp.sale_id
    LEFT JOIN reviews r ON p.id = r.product_id
    WHERE p.id != ?
    GROUP BY 
        p.id, p.name, p.price, p.image, p.description, p.quantity,
        s.id, s.sale_name, s.discount_percentage, s.created_at
    ORDER BY p.id";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $productID);
    $stmt->execute();
    $result = $stmt->get_result();

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    return $products;
}


?>