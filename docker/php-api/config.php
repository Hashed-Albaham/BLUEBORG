<?php

declare(strict_types=1);

return [
    'dsn' => sprintf(
        'mysql:host=%s;dbname=%s;charset=utf8mb4',
        getenv('DB_HOST') ?: 'mysql',
        getenv('DB_NAME') ?: 'btuc_cms'
    ),
    'username' => getenv('DB_USER') ?: 'btuc',
    'password' => getenv('DB_PASSWORD') ?: 'change-me',
    'allowed_origin' => getenv('CORS_ORIGIN') ?: 'http://localhost:3000',
];
