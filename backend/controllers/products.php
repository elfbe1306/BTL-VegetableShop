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

function CountTotalProduct($conn) {
    $sql = "SELECT COUNT(*) AS total_product FROM products;";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        return $row['total_product'];
    } else {
        return 0;
    }
}

function UpdateProduct($conn, $data, $files) {
    $id = (int) $data['id'];
    $name = trim($data['name']);
    $price = floatval($data['price']);
    $quantity = intval($data['quantity']);
    $description = trim($data['description']);
    $oldname = trim($data['oldname']);

    $ProductPathName = preg_replace('/\s+/', '', $name);
    $OldPathName = preg_replace('/\s+/', '', $oldname);

    $baseDir = 'uploads/products/';
    $oldFolder = $baseDir . $OldPathName;
    $newFolder = $baseDir . $ProductPathName;

    // Step 1: Rename folder if needed
    if ($ProductPathName !== $OldPathName && is_dir($oldFolder)) {
        rename($oldFolder, $newFolder);

        // Step 2: Rename images inside the folder
        for ($i = 1; $i <= 3; $i++) {
            $oldImage = $newFolder . '/' . $OldPathName . $i . '.png';
            $newImage = $newFolder . '/' . $ProductPathName . $i . '.png';

            if (file_exists($oldImage)) {
                rename($oldImage, $newImage);
            }
        }
    } else {
        // Make sure the folder exists if it's new
        if (!is_dir($newFolder)) {
            mkdir($newFolder, 0777, true);
        }
    }

    // Step 3: Handle uploaded images
    for ($i = 1; $i <= 3; $i++) {
        $key = 'image' . $i;

        if (isset($files[$key]) && $files[$key]['error'] === UPLOAD_ERR_OK) {
            $tmpName = $files[$key]['tmp_name'];
            $fileName = $ProductPathName . $i . '.png';
            $destination = $newFolder . '/' . $fileName;

            if (!move_uploaded_file($tmpName, $destination)) {
                echo "Failed to move file: $tmpName to $destination<br>";
                echo "Is tmpName readable? " . (is_readable($tmpName) ? "Yes" : "No") . "<br>";
                echo "Does destination dir exist? " . (is_dir($newFolder) ? "Yes" : "No") . "<br>";
                echo "Is destination writable? " . (is_writable($newFolder) ? "Yes" : "No") . "<br>";
            }
        }
    }

    // Step 4: Update database
    $imagePath = $ProductPathName . '/' . $ProductPathName;
    $stmt = $conn->prepare("UPDATE products SET name=?, price=?, quantity=?, image=?, description=? WHERE id=?");
    $stmt->bind_param("sdissi", $name, $price, $quantity, $imagePath, $description, $id);
    $stmt->execute();

    return ["success" => true, "message" => "Product updated successfully", "imagePath" => $imagePath];
}


?>