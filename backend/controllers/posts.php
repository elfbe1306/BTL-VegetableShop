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
        p.author_id,
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

function fetchTagCounts(mysqli $conn): array {
  $sql = "
      SELECT tag, COUNT(*) AS count
      FROM posts
      WHERE tag IS NOT NULL AND tag != ''
      GROUP BY tag
      ORDER BY count DESC
  ";

  $res = $conn->query($sql);

  $tags = [];
  while ($row = $res->fetch_assoc()) {
      $tags[] = [
          'name' => $row['tag'],
          'count' => (int) $row['count']
      ];
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

function handleImageUpload(array $file): ?int {
  if ($file['error'] !== UPLOAD_ERR_OK) return null;

  $uploadDir = __DIR__ . '/../uploads/postsImg/';
  if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0755, true);
  }

  $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
  $filename = uniqid('post_', true) . '.' . $ext;
  $target = $uploadDir . $filename;

  if (!move_uploaded_file($file['tmp_name'], $target)) return null;

  $filepath = 'postsImg/' . $filename;

  // Insert into images table
  global $conn;
  $stmt = $conn->prepare("INSERT INTO images (file_name) VALUES (?)");
  $stmt->bind_param("s", $filepath);
  $stmt->execute();
  return $stmt->insert_id;
}

function createPost(mysqli $conn, array $postData, ?array $file = null): array {
  $title     = $postData['title'] ?? '';
  $slug      = $postData['slug'] ?? '';
  $content   = $postData['content'] ?? '';
  $tag       = $postData['tag'] ?? '';
  $author_id = (int)($postData['author_id'] ?? 0);

  if (!$slug && $title) {
    $slug = slugify($title);
  }
  if (!$title || !$slug || !$content || $author_id < 1) {
    http_response_code(400);
    return ["error" => "Missing required fields"];
  }

  $cover_image_id = null;
  if ($file && isset($file['cover_image'])) {
    $cover_image_id = handleImageUpload($file['cover_image']);
  }

  $stmt = $conn->prepare("INSERT INTO posts (title, slug, content, tag, author_id, cover_image_id, created_at, updated_at)
                          VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())");
  $stmt->bind_param("ssssii", $title, $slug, $content, $tag, $author_id, $cover_image_id);
  $stmt->execute();

  return ["success" => true, "post_id" => $stmt->insert_id];
}

function updatePost(mysqli $conn, int $id, array $postData, ?array $file = null): array {
  $title     = $postData['title'] ?? '';
  $slug      = $postData['slug'] ?? '';
  $content   = $postData['content'] ?? '';
  $tag       = $postData['tag'] ?? '';
  $author_id = (int)($postData['author_id'] ?? 0);

  if (!$slug && $title) {
    $slug = slugify($title);
  }

  if ($id < 1 || !$title || !$slug || !$content || $author_id < 1) {
    http_response_code(400);
    return ["error" => "Missing or invalid data"];
  }

  $cover_image_id = null;
  if ($file && isset($file['cover_image']) && $file['cover_image']['error'] === UPLOAD_ERR_OK) {
    $cover_image_id = handleImageUpload($file['cover_image']);
  }

  if ($cover_image_id !== null) {
    $sql = "UPDATE posts SET title=?, slug=?, content=?, tag=?, author_id=?, cover_image_id=?, updated_at=NOW() WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssiii", $title, $slug, $content, $tag, $author_id, $cover_image_id, $id);
  } else {
    $sql = "UPDATE posts SET title=?, slug=?, content=?, tag=?, author_id=?, updated_at=NOW() WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssii", $title, $slug, $content, $tag, $author_id, $id);
  }

  $stmt->execute();
  return ["success" => true];
}

function slugify(string $text): string {
  // Convert to ASCII
  $text = iconv('UTF-8', 'ASCII//TRANSLIT', $text);
  // Replace non letter or digits by -
  $text = preg_replace('~[^\\pL\d]+~u', '-', $text);
  // Trim
  $text = trim($text, '-');
  // Lowercase
  $text = strtolower($text);
  // Remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);
  return $text ?: uniqid('post-'); // fallback
}


?>