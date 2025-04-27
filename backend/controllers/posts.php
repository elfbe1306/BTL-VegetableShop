<?php

function fetchPostById($conn, int $postId) {
    $sql = "
      SELECT
        p.id,
        p.title,
        p.slug,
        p.content,
        p.created_at,
        p.tag                   AS tag,
        u.name        AS author_name,
        img.file_name AS cover_file
      FROM posts p
      JOIN useraccount u
        ON p.author_id = u.id
      LEFT JOIN images img
        ON p.cover_image_id = img.id
      WHERE p.id = ?
      LIMIT 1
    ";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $postId);
    $stmt->execute();
    $res = $stmt->get_result();
    return $res->fetch_assoc() ?: null;
}

function fetchPostList($conn, int $limit = 8, int $offset = 0): array {
  $sql = "
    SELECT
      p.id,
      p.title,
      p.slug,
      LEFT(p.content, 200)    AS excerpt,
      p.created_at,
      u.name                  AS author_name,
      img.file_name           AS cover_file,
      p.tag                   AS tag
    FROM posts p
    JOIN useraccount u
      ON p.author_id = u.id
    LEFT JOIN images img
      ON p.cover_image_id = img.id
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  ";

  $stmt = $conn->prepare($sql);
  if (!$stmt) {
      throw new Exception("MySQL prepare failed: " . $conn->error);
  }
  $stmt->bind_param("ii", $limit, $offset);
  $stmt->execute();
  $res = $stmt->get_result();

  $posts = [];
  while ($row = $res->fetch_assoc()) {
      $dt = new DateTime($row['created_at']);
      $row['date'] = [
          'day'   => $dt->format('d'),
          'month' => $dt->format('M'),
      ];
      $posts[] = $row;
  }

  return $posts;
}

function fetchAllTags(mysqli $conn): array {
  $sql = "SELECT DISTINCT tag FROM posts WHERE tag IS NOT NULL AND tag != ''";
  $res = $conn->query($sql);

  $tags = [];
  while ($row = $res->fetch_assoc()) {
      $tags[] = $row['tag'];
  }
  return $tags;
}

function searchPosts(mysqli $conn, string $query): array {
  $wildcard = '%' . $conn->real_escape_string($query) . '%';

  $sql = "
    SELECT
      p.id,
      p.title,
      p.slug,
      LEFT(p.content, 200) AS excerpt,
      p.created_at,
      u.name AS author_name,
      img.file_name AS cover_file,
      p.tag
    FROM posts p
    JOIN useraccount u
      ON p.author_id = u.id
    LEFT JOIN images img
      ON p.cover_image_id = img.id
    WHERE p.title LIKE ?
       OR p.tag LIKE ?
    ORDER BY p.created_at DESC
    LIMIT 50
  ";

  $stmt = $conn->prepare($sql);
  if (!$stmt) {
      throw new Exception("Prepare failed: " . $conn->error);
  }
  $stmt->bind_param("ss", $wildcard, $wildcard);
  $stmt->execute();
  $res = $stmt->get_result();

  $posts = [];
  while ($row = $res->fetch_assoc()) {
      $dt = new DateTime($row['created_at']);
      $row['date'] = [
          'day'   => $dt->format('d'),
          'month' => $dt->format('M'),
      ];
      $posts[] = $row;
  }

  return $posts;
}

?>