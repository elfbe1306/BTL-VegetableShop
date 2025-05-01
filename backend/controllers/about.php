<?php
    function fetchInfo($conn) {
        $sql = "SELECT * FROM about";
    
        $result = $conn->query($sql);
    
        $info = [];
    
        while($row = $result->fetch_assoc()) {
            $info[] = $row;
        }
    
        return $info;
    }

    function updateInfo($conn, $title_id, $title, $description, $img = null) {
        if ($img) {
            $sql = "UPDATE about SET title = ?, description = ?, img = ? WHERE title_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $title, $description, $img, $title_id);
        } else {
            $sql = "UPDATE about SET title = ?, description = ? WHERE title_id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssi", $title, $description, $title_id);
        }
    
        if ($stmt->execute()) {
            return ["success" => true];
        } else {
            return ["error" => "Failed to update info"];
        }
    }
    
?>