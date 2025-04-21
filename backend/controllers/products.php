<?php
function fetchAllProductsWithDiscountOrNot($conn) {
    $sql = "SELECT \n"
    . "products.id AS product_id, \n"
    . "sales.id AS sale_id,\n"
    . "products.name,\n"
    . "products.price,\n"
    . "products.image,\n"
    . "products.description,\n"
    . "products.total_star,\n"
    . "products.total_user,\n"
    . "products.quantity,\n"
    . "sales.sale_name,\n"
    . "sales.discount_percentage,\n"
    . "sales.created_at\n"
    . "FROM products \n"
    . "LEFT JOIN sale_products ON products.id = sale_products.product_id\n"
    . "LEFT JOIN sales ON sales.id = sale_products.sale_id;";

    $result = $conn->query($sql);

    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    return $products;
}
?>