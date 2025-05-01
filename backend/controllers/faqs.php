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

    function createQuestion($conn, $question, $answer) {
        $stmt = $conn->prepare("INSERT INTO faqs (question, answer) VALUES (?, ?)");
        $stmt->bind_param("ss", $question, $answer);
        if ($stmt->execute()) {
            return ["success" => true, "id" => $stmt->insert_id];
        } else {
            return ["success" => false, "error" => $stmt->error];
        }
    }

    function updateQuestion($conn, $questionID, $question, $answer) {
        $stmt = $conn->prepare("UPDATE faqs SET question = ?, answer = ? WHERE question_id = ?");
        $stmt->bind_param("ssi", $question, $answer, $questionID);
        if ($stmt->execute()) {
            return ["success" => true];
        } else {
            return ["success" => false, "error" => $stmt->error];
        }
    }
    

    function deleteQuestion($conn, $questionID) {
        $stmt = $conn->prepare("DELETE FROM faqs WHERE question_id = ?");
        $stmt->bind_param("i", $questionID);
        if ($stmt->execute()) {
            return ["success" => true];
        } else {
            return ["success" => false, "error" => $stmt->error];
        }
    }
    
    
?>