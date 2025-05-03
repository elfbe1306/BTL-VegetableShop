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
?>