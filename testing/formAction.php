<?php
// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    
    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Process form data
        echo "Form submitted successfully!";
    } else {
        echo "Invalid email address.";
    }
}
?>