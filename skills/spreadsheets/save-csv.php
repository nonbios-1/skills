<?php
header('Content-Type: application/json');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['csv']) && isset($input['file'])) {
    $csvContent = $input['csv'];
    $filename = $input['file'];
    
    // Validate filename (same rules as frontend)
    if (!preg_match('/^[a-zA-Z0-9_-]+\.csv$/', $filename)) {
        echo json_encode(['success' => false, 'message' => 'Invalid filename']);
        exit;
    }
    
    // Save to file
    $result = file_put_contents($filename, $csvContent);
    
    if ($result !== false) {
        echo json_encode(['success' => true, 'message' => 'CSV saved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to write file']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No CSV data or filename provided']);
}
?>
