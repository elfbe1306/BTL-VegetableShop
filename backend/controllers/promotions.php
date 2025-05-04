<?php
    function fetchPromotions($conn) {
        $sql = "SELECT * FROM sales";
    
        $result = $conn->query($sql);
    
        $promotions = [];
    
        while($row = $result->fetch_assoc()) {
            $promotions[] = $row;
        }
    
        return $promotions;
    }

    function FetchSalePromotions($conn) {
        $sql = "SELECT *, products.name AS product_name, 
            sales.description AS sale_description,
            sales.created_at AS sale_createdAt
            FROM sales 
            INNER JOIN sale_products ON sales.id = sale_products.sale_id
            INNER JOIN products ON sale_products.product_id = products.id";

        $result = $conn->query($sql);

        if (!$result) {
            return ["success" => false, "message" => "Query failed: " . $conn->error];
        }

        $sales = [];
        while($row = $result->fetch_assoc()) {
            $saleID = $row['sale_id'];

            if (!isset($sales[$saleID])) {
                $sales[$saleID] = [
                    "sale_id" => (int) $row['sale_id'],
                    "name" => $row['sale_name'],
                    "discount_percentage" => $row['discount_percentage'],
                    "createdAt" => $row['sale_createdAt'],
                    "image" => $row['image'],
                    "description" => $row['sale_description'],
                    "list_product" => []
                ];
            }

            $sales[$saleID]['list_product'][] = [
                "product_id" => $row['product_id'],
                "product_name" => $row['product_name'],
                "product_price" => $row['price'],
                "quantity" => $row['quantity']
            ];
        }

        return ["success" => true, "sales" => array_values($sales)];
    }
?>