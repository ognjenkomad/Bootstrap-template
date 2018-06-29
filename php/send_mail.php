<?php
    header("Content-Type: application/json;charset=utf-8");
    require_once 'form_validator.php';
    if(isset($_POST['name']) && isset($_POST['surname']) && isset($_POST['email']) && isset($_POST['message'])){
        
        $validation = new form_validator();
        $name = $validation->validate_element($_POST['name'], array('sanitize', 'max_length=25'));
        $name_error = $validation->get_error();
        $surname = $validation->validate_element($_POST['surname'], array('sanitize', 'max_length=25'));
        $surname_error = $validation->get_error();	
        $email = $validation->validate_element($_POST['email'], array('sanitize', 'email'));
        $email_error = $validation->get_error();
        $message = $validation->validate_element($_POST['message'], array('sanitize', 'max_length=500'));
        $message_error = $validation->get_error();

        if($name !== false && $surname !== false && $email !== false && $message !== false){
                        
            $to = 'pelep94@gmail.com';
            $subject = 'Bla';
            $message = wordwrap($message, 70, "\r\n");
            $headers = 'From: ' . "$email" . "\r\n";
            
            if(mail($to, $subject, $message, $headers)){
                $data = array('sent' => 'Thank you for writing to us.');
            } else{
                $data = array('notSent' => 'Something went wrong! Please try again.');
            }
        } else{            
            $data = array('nameError' => "$name_error", 'surnameError' => "$surname_error",
                            'emailError' => "$email_error", 'messageError' => "$message_error");
        }
    } else{
        $data = array('notSet' => 'Something went wrong! Please try again.');
    }
    echo json_encode($data);exit;
?>