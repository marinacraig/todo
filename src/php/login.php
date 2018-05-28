<?php

require __DIR__ . '/vendor/autoload.php';

session_start();

if (isset($_SESSION['user'])) {
    header('Location: tasklist.php');
    die();
}

$error = false;

if (isset($_POST['username']) && isset($_POST['password'])) {
    $user = new User($_POST['username']);

    if (password_verify($_POST['password'], $user->getPasssword())) {
        session_start();
        $_SESSION['user'] = $user->getName();
        header('Location: tasklist.php');
        die();
    } else {
        $error = 'Benutzer oder Passwort stimmt nicht…';
    }
}

?>

<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
</head>
<body>
<form method="post">
    <input type="text" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <button type="submit">Login</button>
    <?php
        if ($error) {
            echo $error;
        }
    ?>
</form>
</body>
</html>