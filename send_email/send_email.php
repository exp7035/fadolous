<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']); // Sanitizes input to prevent malicious code
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = "alexbouchrouche37@gmail.com"; // Replace with your actual email address
    $subject = "New Contact Form Submission"; // Subject of the email
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nMessage: $message"; // Email body
    $headers = "From: $email"; // Sets the sender's email as the "From" field

    if (mail($to, $subject, $body, $headers)) {
        echo "success"; // If the email is sent successfully, return "success"
    } else {
        echo "error"; // If there's an issue, return "error"
    }
}
?>
