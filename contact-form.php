<?php
  $post=$_POST;

  // Set values of inputs -> is set -> value -> else -> empty
  $firstName = isset($post['firstName']) ? $post['firstName'] : '';
  $lastName = isset($post['lastName']) ? $post['lastName'] : '';
  $email = isset($post['email']) ? $post['email'] : '';
  $phone = isset($post['phone']) ? $post['phone'] : '';
  $message = isset($post['message']) ? $post['message'] : '';

  require 'phpmailer/PHPMailerAutoload.php';

  $email_to = "zemplenyi.andrej@gmail.com";

  $full_name = $firstName." ".$lastName;

  $post_message= "Odosielateľ: ".$full_name.
            "\nTelefónne číslo: ".$phone.
            "\nE-mail: ".$email.

            "\n\n\nText správy:\n".$message;

            "\n\n\nDátum: ".date( 'd.m. Y' ).
            "\nČas: ".date( 'r' );

  $subject = "Kontaktny formular - PolyHMG";

      //Create a new PHPMailer instance
      $mail = new PHPMailer;
      //Tell PHPMailer to use SMTP
      $mail->isSMTP();
      //Enable SMTP debugging
      // 0 = off (for production use)
      // 1 = client messages
      // 2 = client and server messages
      $mail->SMTPDebug = 2;
      //Ask for HTML-friendly debug output
      $mail->Debugoutput = 'html';
      //Set the hostname of the mail server
      $mail->Host = "smtp.websupport.sk";
      //Set the SMTP port number - likely to be 25, 465 or 587
      $mail->Port = 25;
      //Whether to use SMTP authentication
      $mail->SMTPAuth = true;
      //Username to use for SMTP authentication
      $mail->Username = "info@polypipe.sk";
      //Password to use for SMTP authentication
      $mail->Password = "21813491Airmoon";
      //Set who the message is to be sent from
      $mail->setFrom('info@polypipe.sk', 'Octopus Enegi');
      //Set an alternative reply-to address
      $mail->addReplyTo($email, $full_name);
      //Set who the message is to be sent to
      $mail->addAddress($email_to, 'Octopus Energi');
      //Set the subject line
      $mail->Subject = $subject;
      //Read an HTML message body from an external file, convert referenced images to embedded,
      //convert HTML into a basic plain-text alternative body

      //$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

      //Replace the plain text body with one created manually
      $mail->Body = $post_message;

      //send the message, check for errors
      if (!$mail->send()) {
          $errors[] = "Mailer Error: " . $mail->ErrorInfo;
          echo "there was an error";
      } else {
          echo "success";
      }
?>