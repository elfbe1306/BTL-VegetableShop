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

    function addTeam($conn, $name, $role, $img) {
        $stmt = $conn->prepare("INSERT INTO teams (name, role, img) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $role, $img);
        return $stmt->execute();
    }
    
    function updateTeam($conn, $team_id, $name, $role, $img) {
        if ($img) {
            $stmt = $conn->prepare("UPDATE teams SET name = ?, role = ?, img = ? WHERE team_id = ?");
            $stmt->bind_param("sssi", $name, $role, $img, $team_id);
        } else {
            $stmt = $conn->prepare("UPDATE teams SET name = ?, role = ? WHERE team_id = ?");
            $stmt->bind_param("ssi", $name, $role, $team_id);
        }
        return $stmt->execute();
    }
    
    function deleteTeam($conn, $team_id) {
        $stmt = $conn->prepare("DELETE FROM teams WHERE team_id = ?");
        $stmt->bind_param("i", $team_id);
        if ($stmt->execute()) {
            return ["success" => true];
        } else {
            return ["success" => false, "error" => $stmt->error];
        }
    }
?>