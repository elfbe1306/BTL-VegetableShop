<?php
function fetchAllProductsWithDiscountOrNot($conn) {
    $sql = "SELECT \n"
    . "    p.id AS product_id,\n"
    . "    s.id AS sale_id,\n"
    . "    p.name,\n"
    . "    p.price,\n"
    . "    p.image,\n"
    . "    p.description,\n"
    . "    p.quantity,\n"
    . "    s.sale_name,\n"
    . "    s.discount_percentage,\n"
    . "    s.created_at,\n"
    . "    COALESCE(SUM(r.star), 0) AS total_star,\n"
    . "    COUNT(r.id) AS total_user\n"
    . "FROM products p\n"
    . "LEFT JOIN sale_products sp ON p.id = sp.product_id\n"
    . "LEFT JOIN sales s ON s.id = sp.sale_id\n"
    . "LEFT JOIN reviews r ON p.id = r.product_id\n"
    . "GROUP BY \n"
    . "    p.id, p.name, p.price, p.image, p.description, p.quantity,\n"
    . "    s.id, s.sale_name, s.discount_percentage, s.created_at\n"
    . "ORDER BY p.id;";

    $result = $conn->query($sql);

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    return $products;
}
function fetchProductByName($conn, $name) {
    $stmt = $conn->prepare("SELECT * FROM products WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    $product = $result->fetch_assoc();
    return $product;
}

?>