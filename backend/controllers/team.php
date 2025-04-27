<?php
    function fetchTeam($conn) {
        $sql = "SELECT * FROM teams";
    
        $result = $conn->query($sql);
    
        $team = [];
    
        while($row = $result->fetch_assoc()) {
            $team[] = $row;
        }
    
        return $team;
    }
?>