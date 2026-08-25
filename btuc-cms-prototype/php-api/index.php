<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
$config = require __DIR__ . '/config.php';
header('Access-Control-Allow-Origin: ' . $config['allowed_origin']);
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

function output(array $body, int $status = 200): never { http_response_code($status); echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); exit; }
function body(): array { return json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR); }
function roleLabel(string $role): string { return ['admin' => 'مدير', 'editor' => 'محرر', 'reviewer' => 'مراجع'][$role] ?? 'مراجع'; }
function bearer(): ?string { $header = $_SERVER['HTTP_AUTHORIZATION'] ?? ''; return preg_match('/^Bearer\s+(.+)$/i', $header, $match) ? $match[1] : null; }
function actor(PDO $pdo): ?array {
  $token = bearer(); if (!$token) return null;
  $stmt = $pdo->prepare('SELECT u.id, u.name, u.username, u.role, u.active FROM cms_sessions s JOIN cms_users u ON u.id=s.user_id WHERE s.token_hash=:hash AND s.expires_at>NOW() LIMIT 1');
  $stmt->execute(['hash' => hash('sha256', $token)]); $user = $stmt->fetch();
  return ($user && (int)$user['active'] === 1) ? $user : null;
}
function requireRole(PDO $pdo, array $roles): array { $user = actor($pdo); if (!$user) output(['error' => 'Unauthorized'], 401); if (!in_array($user['role'], $roles, true)) output(['error' => 'Forbidden'], 403); return $user; }

try {
  $pdo = new PDO($config['dsn'], $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
  $path = rtrim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/', '/');
  if ($path === '/health' && $_SERVER['REQUEST_METHOD'] === 'GET') output(['ok' => true]);

  if ($path === '/auth/login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = body(); $stmt = $pdo->prepare('SELECT * FROM cms_users WHERE username=:username AND active=1 LIMIT 1'); $stmt->execute(['username' => $input['username'] ?? '']); $user = $stmt->fetch();
    if (!$user || !password_verify((string)($input['password'] ?? ''), $user['password_hash'])) output(['error' => 'Invalid credentials'], 401);
    $token = bin2hex(random_bytes(32)); $session = $pdo->prepare('INSERT INTO cms_sessions (token_hash,user_id,expires_at) VALUES (:hash,:user,DATE_ADD(NOW(), INTERVAL 8 HOUR))'); $session->execute(['hash' => hash('sha256', $token), 'user' => $user['id']]);
    output(['token' => $token, 'user' => ['id' => $user['id'], 'name' => $user['name'], 'username' => $user['username'], 'role' => roleLabel($user['role'])]]);
  }
  if ($path === '/auth/me' && $_SERVER['REQUEST_METHOD'] === 'GET') { $user = requireRole($pdo, ['admin','editor','reviewer']); $user['role'] = roleLabel($user['role']); output(['user' => $user]); }
  if ($path === '/auth/logout' && $_SERVER['REQUEST_METHOD'] === 'POST') { $token = bearer(); if ($token) { $stmt = $pdo->prepare('DELETE FROM cms_sessions WHERE token_hash=:hash'); $stmt->execute(['hash' => hash('sha256', $token)]); } output(['ok' => true]); }

  if ($path === '/content' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $pages = $pdo->query("SELECT id,title,slug,status,sections,updated_at FROM cms_pages WHERE status='published' ORDER BY updated_at DESC")->fetchAll();
    $posts = $pdo->query("SELECT id,title,excerpt,status,updated_at FROM cms_posts WHERE status='published' ORDER BY updated_at DESC")->fetchAll();
    $media = $pdo->query('SELECT id,name,url,alt_text AS alt,category FROM cms_media ORDER BY created_at DESC')->fetchAll();
    output(['pages' => $pages, 'posts' => $posts, 'media' => $media]);
  }
  if ($path === '/content' && $_SERVER['REQUEST_METHOD'] === 'PUT') {
    requireRole($pdo, ['admin','editor']); $payload = body(); if (!isset($payload['pages'], $payload['posts'], $payload['media'])) output(['error' => 'Invalid content payload'], 422);
    $pdo->beginTransaction(); $pdo->exec('DELETE FROM cms_pages; DELETE FROM cms_posts; DELETE FROM cms_media;');
    $pageStmt = $pdo->prepare('INSERT INTO cms_pages (id,title,slug,status,sections) VALUES (:id,:title,:slug,:status,:sections)'); foreach ($payload['pages'] as $page) $pageStmt->execute(['id'=>$page['id'],'title'=>$page['title'],'slug'=>$page['slug'],'status'=>['منشورة'=>'published','معطلة'=>'disabled','محذوفة'=>'deleted'][$page['status']] ?? 'draft','sections'=>json_encode($page['sections'], JSON_UNESCAPED_UNICODE)]);
    $postStmt = $pdo->prepare('INSERT INTO cms_posts (id,title,excerpt,status) VALUES (:id,:title,:excerpt,:status)'); foreach ($payload['posts'] as $post) $postStmt->execute(['id'=>$post['id'],'title'=>$post['title'],'excerpt'=>$post['excerpt'] ?? null,'status'=>$post['status']==='منشورة'?'published':'draft']);
    $mediaStmt = $pdo->prepare('INSERT INTO cms_media (id,name,url,alt_text,category) VALUES (:id,:name,:url,:alt,:category)'); foreach ($payload['media'] as $media) $mediaStmt->execute(['id'=>$media['id'],'name'=>$media['name'],'url'=>$media['url'],'alt'=>$media['alt'] ?? null,'category'=>$media['category'] ?? 'project']);
    $pdo->commit(); output(['ok'=>true]);
  }
  if ($path === '/users' && $_SERVER['REQUEST_METHOD'] === 'GET') { requireRole($pdo, ['admin']); $users = $pdo->query('SELECT id,name,username,role,active,created_at FROM cms_users ORDER BY created_at DESC')->fetchAll(); foreach($users as &$user) $user['role']=roleLabel($user['role']); output(['users'=>$users]); }
  if ($path === '/users' && $_SERVER['REQUEST_METHOD'] === 'POST') { requireRole($pdo, ['admin']); $input=body(); $id=bin2hex(random_bytes(16)); $role=['مدير'=>'admin','محرر'=>'editor','مراجع'=>'reviewer'][$input['role'] ?? 'مراجع']; $stmt=$pdo->prepare('INSERT INTO cms_users (id,name,username,password_hash,role) VALUES (:id,:name,:username,:password_hash,:role)'); $stmt->execute(['id'=>$id,'name'=>$input['name'],'username'=>$input['username'],'password_hash'=>password_hash($input['password'], PASSWORD_DEFAULT),'role'=>$role]); output(['id'=>$id],201); }
  output(['error' => 'Not found'], 404);
} catch (Throwable $error) { if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack(); output(['error' => 'CMS service error'], 500); }
