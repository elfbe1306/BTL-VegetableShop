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
        $sql = "SELECT 
                    sales.id AS sale_id, 
                    sales.sale_name, 
                    sales.discount_percentage, 
                    sales.description AS sale_description,
                    sales.created_at AS sale_createdAt,
                    sales.image AS sale_image,
                    sale_products.product_id,
                    products.name AS product_name,
                    products.price AS product_price,
                    products.quantity
                FROM sales 
                LEFT JOIN sale_products ON sales.id = sale_products.sale_id
                LEFT JOIN products ON sale_products.product_id = products.id";
    
        $result = $conn->query($sql);
    
        if (!$result) {
            return ["success" => false, "message" => "Query failed: " . $conn->error];
        }
    
        $sales = [];
    
        while ($row = $result->fetch_assoc()) {
            $saleID = $row['sale_id'];
    
            // Initialize the sale if not already present
            if (!isset($sales[$saleID])) {
                $sales[$saleID] = [
                    "sale_id" => (int) $saleID,
                    "name" => $row['sale_name'],
                    "discount_percentage" => $row['discount_percentage'],
                    "createdAt" => $row['sale_createdAt'],
                    "image" => $row['sale_image'],
                    "description" => $row['sale_description'],
                    "list_product" => []
                ];
            }
    
            // Only add product if it exists
            if (!is_null($row['product_id'])) {
                $sales[$saleID]['list_product'][] = [
                    "product_id" => (int) $row['product_id'],
                    "product_name" => $row['product_name'],
                    "product_price" => (float) $row['product_price'],
                    "quantity" => (int) $row['quantity']
                ];
            }
        }
    
        return ["success" => true, "sales" => array_values($sales)];
    }
    

    function FetchProductForSale($conn) {
        $sql = "SELECT name AS product_name, id AS product_id, price AS product_price, quantity FROM products";
        $result = $conn->query($sql);
        $products = [];
    
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    
        return $products;
    }

    function UpdateSale($conn, $data, $files) {
        $id = (int) $data['id'];
        $name = trim($data['name']);
        $discount = floatval($data['discount_percentage']);
        $description = trim($data['description']);
        $oldname = trim($data['oldname']);
        $selectedProducts = json_decode($data['selectedProducts'], true);

        $SalePathName = preg_replace('/\s+/', '', $name);
        $OldPathName = preg_replace('/\s+/', '', $oldname);

        $baseDir = 'uploads/promotion/';
        $oldFolder = $baseDir . $OldPathName;
        $newFolder = $baseDir . $SalePathName;
        
        // Step 1: Rename folder if needed
        if ($SalePathName !== $OldPathName && is_dir($oldFolder)) {
            rename($oldFolder, $newFolder);

            // Step 2: Rename images inside the folder
            for ($i = 1; $i <= 2; $i++) {
                $oldImage = $newFolder . '/' . $OldPathName . $i . '.png';
                $newImage = $newFolder . '/' . $SalePathName . $i . '.png';

                if (file_exists($oldImage)) {
                    rename($oldImage, $newImage);
                }
            }
        } else {
            if (!is_dir($newFolder)) {
                mkdir($newFolder, 0777, true);
            }
        }

        // Step 3: Handle uploaded images
        for ($i = 1; $i <= 2; $i++) {
            $key = 'image' . $i;

            if (isset($files[$key]) && $files[$key]['error'] === UPLOAD_ERR_OK) {
                $tmpName = $files[$key]['tmp_name'];
                $fileName = $SalePathName . $i . '.png';
                $destination = $newFolder . '/' . $fileName;

                if (!move_uploaded_file($tmpName, $destination)) {
                    echo "Failed to move file: $tmpName to $destination<br>";
                    echo "Is tmpName readable? " . (is_readable($tmpName) ? "Yes" : "No") . "<br>";
                    echo "Does destination dir exist? " . (is_dir($newFolder) ? "Yes" : "No") . "<br>";
                    echo "Is destination writable? " . (is_writable($newFolder) ? "Yes" : "No") . "<br>";
                }
            }
        }

        // Step 4: Update sales table
        $imagePath = $SalePathName . '/' . $SalePathName;
        $stmt = $conn->prepare("UPDATE sales SET sale_name=?, discount_percentage=?, description=?, image=? WHERE id=?");
        $stmt->bind_param("sdssi", $name, $discount, $description, $imagePath, $id);
        $stmt->execute();

        // Step 5: Reassign products in sale_products

        // 5.1: Delete all existing sale_products for this sale
        $deleteStmt = $conn->prepare("DELETE FROM sale_products WHERE sale_id = ?");
        $deleteStmt->bind_param("i", $id);
        $deleteStmt->execute();

        // 5.2: For each selected product, ensure it's not linked to another sale
        foreach ($selectedProducts as $product) {
            $product_id = (int) $product['product_id'];

            // Remove from any existing sale (if exists)
            $checkStmt = $conn->prepare("SELECT sale_id FROM sale_products WHERE product_id = ?");
            $checkStmt->bind_param("i", $product_id);
            $checkStmt->execute();
            $result = $checkStmt->get_result();

            if ($result->num_rows > 0) {
                $removeStmt = $conn->prepare("DELETE FROM sale_products WHERE product_id = ?");
                $removeStmt->bind_param("i", $product_id);
                $removeStmt->execute();
            }

            // Assign to this sale
            $insertStmt = $conn->prepare("INSERT INTO sale_products (sale_id, product_id) VALUES (?, ?)");
            $insertStmt->bind_param("ii", $id, $product_id);
            $insertStmt->execute();
        }

        return ["success" => true, "message" => "Sale updated successfully"];
    }
?>