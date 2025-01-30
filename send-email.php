<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
$response = array();

try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@yourdomain.com'; // Your Google Workspace email
    $mail->Password = 'your-app-password'; // Google App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Recipients
    $mail->setFrom('your-email@yourdomain.com', 'My Irish Cousin');
    $mail->addAddress('your-email@yourdomain.com');
    $mail->addReplyTo($_POST['email'], $_POST['fullName']);

    // Format dates and times
    $pickupDateTime = date('F j, Y g:i A', strtotime($_POST['pickupDate'] . ' ' . $_POST['pickupTime']));
    $returnDateTime = date('F j, Y g:i A', strtotime($_POST['returnDate'] . ' ' . $_POST['returnTime']));

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New Car Rental Inquiry from ' . $_POST['fullName'];
    
    // Create HTML email body
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .section { margin-bottom: 30px; }
            h2 { color: #31C77E; border-bottom: 2px solid #31C77E; padding-bottom: 5px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #666; }
            .value { margin-left: 10px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='section'>
                <h2>Vehicle Details</h2>
                <div class='detail'>
                    <span class='label'>Vehicle Type:</span>
                    <span class='value'>{$_POST['carType']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Transmission:</span>
                    <span class='value'>{$_POST['transmission']}</span>
                </div>
            </div>

            <div class='section'>
                <h2>Rental Details</h2>
                <div class='detail'>
                    <span class='label'>Pickup:</span>
                    <span class='value'>{$_POST['pickupLocation']} on {$pickupDateTime}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Return:</span>
                    <span class='value'>{$_POST['returnLocation']} on {$returnDateTime}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Passengers:</span>
                    <span class='value'>{$_POST['passengers']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>International Travel:</span>
                    <span class='value'>{$_POST['international']}</span>
                </div>
            </div>

            <div class='section'>
                <h2>Customer Information</h2>
                <div class='detail'>
                    <span class='label'>Name:</span>
                    <span class='value'>{$_POST['fullName']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Email:</span>
                    <span class='value'>{$_POST['email']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Phone:</span>
                    <span class='value'>{$_POST['phone']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>First Visit to Ireland:</span>
                    <span class='value'>{$_POST['firstVisit']}</span>
                </div>
                <div class='detail'>
                    <span class='label'>Special Occasion:</span>
                    <span class='value'>" . ($_POST['occasion'] ?: 'N/A') . "</span>
                </div>
                <div class='detail'>
                    <span class='label'>Found Us Through:</span>
                    <span class='value'>{$_POST['referral']}</span>
                </div>
            </div>

            <div class='section'>
                <h2>Additional Information</h2>
                <div class='detail'>
                    <span class='label'>Questions/Comments:</span>
                    <span class='value'>" . (nl2br($_POST['questions']) ?: 'None') . "</span>
                </div>
            </div>
        </div>
    </body>
    </html>";

    $mail->Body = $emailBody;
    $mail->AltBody = strip_tags(str_replace(['<div class="detail">', '</div>'], "\n", $emailBody));

    $mail->send();
    
    $response['success'] = true;
    $response['message'] = 'Message sent successfully';
    echo json_encode($response);
    
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    echo json_encode($response);
} 
