<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
$config = require __DIR__ . '/config.php';
header('Access-Control-Allow-Origin: ' . $config['allowed_origin']);
header('Access-Control-Allow-Methods: GET, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

function output(array $body, int $status = 200): never {
  http_response_code($status);
  echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

try {
  $pdo = new PDO($config['dsn'], $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
  $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/', '/');
  if ($path === '/health' && $_SERVER['REQUEST_METHOD'] === 'GET') output(['ok' => true]);
  if ($path !== '/content') output(['error' => 'Not found'], 404);
  if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $pages = $pdo->query('SELECT id, title, slug, status, blocks, updated_at FROM cms_pages ORDER BY updated_at DESC')->fetchAll();
    $posts = $pdo->query('SELECT id, title, excerpt, status, updated_at FROM cms_posts ORDER BY updated_at DESC')->fetchAll();
    $templates = $pdo->query('SELECT id, name, type, description, fields, updated_at FROM cms_templates ORDER BY updated_at DESC')->fetchAll();
    output(['pages' => $pages, 'posts' => $posts, 'templates' => $templates]);
  }
  if ($_SERVER['REQUEST_METHOD'] !== 'PUT') output(['error' => 'Method not allowed'], 405);
  $payload = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
  if (!isset($payload['pages'], $payload['posts'], $payload['templates']) || !is_array($payload['pages']) || !is_array($payload['posts']) || !is_array($payload['templates'])) output(['error' => 'Invalid content payload'], 422);
  $pdo->beginTransaction();
  $pdo->exec('DELETE FROM cms_pages; DELETE FROM cms_posts; DELETE FROM cms_templates;');
  $pageStmt = $pdo->prepare('INSERT INTO cms_pages (id, title, slug, status, blocks) VALUES (:id, :title, :slug, :status, :blocks)');
  foreach ($payload['pages'] as $page) $pageStmt->execute(['id' => $page['id'], 'title' => $page['title'], 'slug' => $page['slug'], 'status' => $page['status'] === 'منشورة' ? 'published' : 'draft', 'blocks' => json_encode($page['blocks'], JSON_UNESCAPED_UNICODE)]);
  $postStmt = $pdo->prepare('INSERT INTO cms_posts (id, title, excerpt, status) VALUES (:id, :title, :excerpt, :status)');
  foreach ($payload['posts'] as $post) $postStmt->execute(['id' => $post['id'], 'title' => $post['title'], 'excerpt' => $post['excerpt'] ?? null, 'status' => $post['status'] === 'منشورة' ? 'published' : 'draft']);
  $templateStmt = $pdo->prepare('INSERT INTO cms_templates (id, name, type, description, fields) VALUES (:id, :name, :type, :description, :fields)');
  foreach ($payload['templates'] as $template) $templateStmt->execute(['id' => $template['id'], 'name' => $template['name'], 'type' => $template['type'], 'description' => $template['description'] ?? null, 'fields' => json_encode($template['fields'], JSON_UNESCAPED_UNICODE)]);
  $pdo->commit();
  output($payload);
} catch (Throwable $error) {
  if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
  output(['error' => 'CMS service error'], 500);
}
