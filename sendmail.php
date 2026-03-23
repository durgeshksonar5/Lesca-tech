<?php
/**
 * Lesca Tech - Form Processing Script
 * Handles submissions from Contact and Career forms.
 */

// Error reporting for debugging (disable in production)
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

$to_email = "info@lescatech.com";
$from_email = "no-reply@lescatech.com"; // Recommended to use a domain-based email

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize and collect common fields
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : "";
    if (empty($name) && isset($_POST['fname'])) {
        $name = strip_tags(trim($_POST['fname'])) . " " . strip_tags(trim($_POST['lname']));
    }
    
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : "Not provided";
    $message = isset($_POST['message']) ? nl2br(strip_tags(trim($_POST['message']))) : "No message";
    
    // Determine form type
    $is_career = isset($_POST['position']) ? true : false;
    $subject = $is_career ? "New Job Application: " . $name : "New Website Inquiry: " . $name;
    $position = $is_career ? strip_tags(trim($_POST['position'])) : "";

    // Validation
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields correctly.";
        exit;
    }

    // Email Body Construction
    $email_content = "<h2>" . ($is_career ? "Career Application" : "Contact Inquiry") . "</h2>";
    $email_content .= "<p><strong>Name:</strong> {$name}</p>";
    $email_content .= "<p><strong>Email:</strong> {$email}</p>";
    $email_content .= "<p><strong>Phone:</strong> {$phone}</p>";
    if ($is_career) {
        $email_content .= "<p><strong>Position Applying For:</strong> {$position}</p>";
    }
    $email_content .= "<p><strong>Message:</strong><br>{$message}</p>";

    // Boundary for multipart email
    $boundary = md5(time());
    
    // Headers
    $headers = "From: Lesca Tech Website <{$from_email}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    // multipart message
    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $email_content . "\r\n";

    // Handle File Upload (Resume)
    if ($is_career && isset($_FILES['resume']) && $_FILES['resume']['error'] == UPLOAD_ERR_OK) {
        $file_name = $_FILES['resume']['name'];
        $file_size = $_FILES['resume']['size'];
        $file_tmp = $_FILES['resume']['tmp_name'];
        $file_type = $_FILES['resume']['type'];
        
        $allowed_ext = array("pdf", "doc", "docx");
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        
        if (in_array($file_ext, $allowed_ext) && $file_size <= 2097152) { // 2MB limit
            $content = file_get_contents($file_tmp);
            $encoded_content = chunk_split(base64_encode($content));
            
            $body .= "--{$boundary}\r\n";
            $body .= "Content-Type: {$file_type}; name=\"{$file_name}\"\r\n";
            $body .= "Content-Disposition: attachment; filename=\"{$file_name}\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $body .= $encoded_content . "\r\n";
            
            // Optional: Save to uploads folder
            if (!is_dir('uploads')) {
                mkdir('uploads', 0755, true);
            }
            move_uploaded_file($file_tmp, "uploads/" . time() . "_" . $file_name);
        }
    }

    $body .= "--{$boundary}--";

    // Send Email
    if (mail($to_email, $subject, $body, $headers)) {
        http_response_code(200);
        echo "Form submitted successfully. We will get back to you soon!";
    } else {
        http_response_code(500);
        echo "Something went wrong. Please try again later.";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
