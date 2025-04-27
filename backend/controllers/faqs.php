<?php
    function fetchQuestions($conn) {
        $sql = "SELECT * FROM faqs";
    
        $result = $conn->query($sql);
    
        $question = [];
    
        while($row = $result->fetch_assoc()) {
            $question[] = $row;
        }
    
        return $question;
    }
?>