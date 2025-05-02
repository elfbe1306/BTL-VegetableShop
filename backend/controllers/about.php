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
?>