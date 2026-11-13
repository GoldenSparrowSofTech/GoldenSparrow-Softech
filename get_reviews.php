<?php
/**
 * Golden Sparrow SofTech - Google My Business Reviews Fetcher & Cache Proxy
 * Auto-fetches live reviews via Google Places API and caches locally.
 * Falls back to reviews.json if API key not set or fetch fails.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$cache_file = __DIR__ . '/reviews_cache.json';
$fallback_file = __DIR__ . '/reviews.json';
$cache_lifetime = 86400; // 24 hours

// Optional Google Places API credentials (Set in environment or define here)
$api_key = getenv('GOOGLE_PLACES_API_KEY') ?: '';
$place_id = getenv('GOOGLE_PLACE_ID') ?: '';

$force_refresh = isset($_GET['refresh']) && $_GET['refresh'] === '1';

// Return valid cache if available and fresh
if (!$force_refresh && file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_lifetime)) {
    $cached = @file_get_contents($cache_file);
    if (!empty($cached)) {
        echo $cached;
        exit;
    }
}

// Attempt live fetch if credentials present
if (!empty($api_key) && !empty($place_id)) {
    $url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" . urlencode($place_id) . "&fields=name,rating,user_ratings_total,reviews,url&key=" . urlencode($api_key);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code === 200 && !empty($response)) {
        $data = json_decode($response, true);
        if (isset($data['status']) && $data['status'] === 'OK' && isset($data['result'])) {
            $res = $data['result'];
            $formatted_reviews = [];
            if (!empty($res['reviews'])) {
                foreach ($res['reviews'] as $r) {
                    $formatted_reviews[] = [
                        'author_name' => $r['author_name'] ?? 'Google User',
                        'author_photo' => $r['profile_photo_url'] ?? '',
                        'rating' => (int)($r['rating'] ?? 5),
                        'relative_time_description' => $r['relative_time_description'] ?? 'Recently',
                        'text' => $r['text'] ?? '',
                        'badge' => 'Google Verified'
                    ];
                }
            }

            $payload = [
                'business_name' => $res['name'] ?? 'Golden Sparrow SofTech',
                'rating' => (float)($res['rating'] ?? 4.5),
                'total_reviews' => (int)($res['user_ratings_total'] ?? count($formatted_reviews)),
                'google_maps_url' => $res['url'] ?? 'https://www.google.com/search?q=Golden+Sparrow+SofTech+Rajkot',
                'write_review_url' => 'https://search.google.com/local/writereview?placeid=' . urlencode($place_id),
                'reviews' => $formatted_reviews,
                'source' => 'google_places_api',
                'cached_at' => date('c')
            ];

            $json_payload = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            @file_put_contents($cache_file, $json_payload);
            echo $json_payload;
            exit;
        }
    }
}

// Fallback to reviews.json
if (file_exists($fallback_file)) {
    $fallback_data = @file_get_contents($fallback_file);
    if (!empty($fallback_data)) {
        echo $fallback_data;
        exit;
    }
}

// Default static JSON fallback
echo json_encode([
    'business_name' => 'Golden Sparrow SofTech',
    'rating' => 4.5,
    'total_reviews' => 2,
    'google_maps_url' => 'https://www.google.com/search?q=Golden+Sparrow+SofTech+Rajkot',
    'reviews' => []
]);

