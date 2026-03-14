<?php

$ua = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
$isBot = (bool) preg_match(
  '/facebookexternalhit|Twitterbot|Discordbot|Slackbot|LinkedInBot|WhatsApp|TelegramBot|Applebot|Google.*snippet|Googlebot|bingbot|SkypeUriPreview|redditbot|Meta-ExternalAgent/i',
  $ua
);

$debug = isset($_GET['dbg']);

if (!$isBot && !$debug) {
  $indexPath = __DIR__ . '/index.html';
  if (is_file($indexPath)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($indexPath);
    exit;
  }
  http_response_code(404);
  echo 'Not found';
  exit;
}

$path = isset($_SERVER['REQUEST_URI']) ? urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)) : '/';
$path = rtrim($path, '/') ?: '/';

$metaFile = __DIR__ . '/meta.json';
$meta = file_exists($metaFile) ? json_decode(file_get_contents($metaFile), true) : [];

$siteName = 'MetaZaurus';
$defaultDesc = 'PDA reader for MetaZoo: Cryptid Nation lore';
$defaultImage = 'https://metazaurus.com/favicon.ico';

$route = isset($meta[$path]) ? $meta[$path] : null;
$title = $route ? $route['title'] : $siteName;
$desc = $route ? $route['description'] : $defaultDesc;
$image = $defaultImage;

if ($debug) {
  header('Content-Type: text/plain; charset=utf-8');
  echo "UA: $ua\nBOT: " . ($isBot ? 'yes' : 'no') . "\nPATH: $path\n";
  echo "TITLE: $title\nDESC: $desc\n";
  echo "ROUTE FOUND: " . ($route ? 'yes' : 'no') . "\n";
  echo "TOTAL ROUTES: " . count($meta) . "\n";
  exit;
}

$url = 'https://metazaurus.com' . $path;

$safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
$safeDesc = htmlspecialchars($desc, ENT_QUOTES, 'UTF-8');
$safeImg = htmlspecialchars($image, ENT_QUOTES, 'UTF-8');

header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: public, max-age=600, s-maxage=600');

echo "<!doctype html>\n<html lang=\"en\"><head>\n";
echo "<meta charset=\"utf-8\" />\n";
echo "<title>{$safeTitle}</title>\n";
echo "<meta name=\"description\" content=\"{$safeDesc}\" />\n";
echo "<link rel=\"canonical\" href=\"{$url}\" />\n";
echo "<meta property=\"og:site_name\" content=\"{$siteName}\" />\n";
echo "<meta property=\"og:type\" content=\"website\" />\n";
echo "<meta property=\"og:title\" content=\"{$safeTitle}\" />\n";
echo "<meta property=\"og:description\" content=\"{$safeDesc}\" />\n";
echo "<meta property=\"og:image\" content=\"{$safeImg}\" />\n";
echo "<meta property=\"og:url\" content=\"{$url}\" />\n";
echo "<meta name=\"twitter:card\" content=\"summary\" />\n";
echo "<meta name=\"twitter:title\" content=\"{$safeTitle}\" />\n";
echo "<meta name=\"twitter:description\" content=\"{$safeDesc}\" />\n";
echo "<meta name=\"twitter:image\" content=\"{$safeImg}\" />\n";
echo "</head><body><a href=\"{$url}\">{$safeTitle}</a></body></html>";
