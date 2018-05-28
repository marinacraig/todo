<?php

require __DIR__ . '/vendor/autoload.php';

session_start();

$error = false;

if (isset($_SESSION['user'])) {
    header('Location: tasklist.php');
    die();
}

if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
    $user = new User($_POST['username']);

    if($user->getName()){
        $error = 'Benutzer existiert bereits';
    }else{
        $user->setName($_POST['username']);
        $user->setPasssword(password_hash($_POST['password'], PASSWORD_DEFAULT));
        $user->setEmail($_POST['email']);
        $user->create();


        $_SESSION['user'] = $user->getName();
        header('Location: tasklist.php');
        die();
    }

}



?>

<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registrierung</title>
</head>
<body>
<form method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Registrieren</button>
    <?php
    if ($error) {
        echo $error;
    }
    ?>
</form>
</body>
</html>
