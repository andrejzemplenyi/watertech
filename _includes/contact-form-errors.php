<?php
    //Print Errors
    if (isset($_POST["submit"])) {
        // Print any error messages.
        if (!empty($errors)) {
            echo "<hr /><h3>Formulár sa nepodarilo odoslať</h3><ul>";
                // Print each error.
                foreach ($errors as $msg) {
                echo "<li>". $msg . "</li>";
                }
        } else {
            echo $successMessage;
        }
    }
?>