<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function CreateContact($conn, $jwtToken, $userData) {
    $key = "congabietgay";

    $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));
    $userID = $decoded->userId ?? null;

    $sql = "INSERT INTO `contacts` (`customer_id`, `phonenum`, `subject`, `content`, `status`) VALUES (?, ?, ?, ?, ?);";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        return "Error: Unable to prepare statement.";
    }

    $status = "Unread";

    $stmt->bind_param("issss", $userID, $userData['phonenum'], $userData['subject'], $userData['content'], $status);

    if ($stmt->execute()) {
        return array("message" => "Your question is successfully sent", "success" => true);
    } else {
        return array("error" => $stmt->error, "success" => false);
    }
}

function FetchUserName($conn, $jwtToken) {
    $key = "congabietgay";

    $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));
    $userID = $decoded->userId ?? null;

    $sql = "SELECT name FROM `contacts` INNER JOIN `userAccount` ON userAccount.id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        return "Error: Unable to prepare statement.";
    }

    $stmt->bind_param("i", $userID);

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            return array(
                "message" => "Fetching user name successfully",
                "success" => true,
                "username" => $row['name']
            );
        } else {
            return array("error" => "User not found", "success" => false);
        }
    } else {
        return array("error" => $stmt->error, "success" => false);
    }
}

function FetchContact($conn) {
    $sql = "SELECT 
                contacts.id,
                useraccount.name, 
                contacts.phonenum, 
                contacts.subject, 
                contacts.content,
                contacts.status
            FROM contacts
            INNER JOIN useraccount ON contacts.customer_id = useraccount.id";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $contacts = [];
        while ($row = $result->fetch_assoc()) {
            $contacts[] = $row;
        }
        return array(
            "message" => "Fetched contacts successfully",
            "success" => true,
            "data" => $contacts
        );
    } else {
        return array(
            "message" => "No contact found",
            "success" => false
        );
    }
}

function deleteContact($conn, $id) {
    $stmt = $conn->prepare("DELETE FROM contacts WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        return ["success" => true];
    } else {
        return ["success" => false, "error" => $stmt->error];
    }
}

function ChangeContactToRead($conn, $ContactID) {
    $sql = "UPDATE contacts SET status=? WHERE id=?";

    $newStatus = "Read";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $ContactID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Read"];
}

function ChangeContactToUnRead($conn, $ContactID) {
    $sql = "UPDATE contacts SET status=? WHERE id=?";

    $newStatus = "Unread";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $ContactID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Unread"];
}

function ChangeContactToComplete($conn, $ContactID) {
    $sql = "UPDATE contacts SET status=? WHERE id=?";

    $newStatus = "Complete";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $ContactID);
    $stmt->execute();

    return ["success" => true, "message" => "Successfully changed to Complete"];
}

?>