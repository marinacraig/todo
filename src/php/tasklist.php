<?php

require __DIR__ . '/vendor/autoload.php';

session_start();

if ($_POST['logout']) {
    unset($_SESSION['user']);
}

if(isset($_POST['setDone'])){
    // task updaten
    $task = new Task($_POST['setDone']);
    $task->set_state('done');
    $task->update();
}

if(isset($_POST['setOpen'])){
    // task updaten
    $task = new Task($_POST['setOpen']);
    $task->set_state('open');
    $task->update();
}

$user = false;

if (isset($_SESSION['user'])) {
    $user = new User($_SESSION['user']);
    // für check $task = new Task(1);
} else {
    header('Location: login.php');
    die();
}

?>

<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Taskliste</title>
</head>
<body>
<form method="post">
    Hallo <?php echo $user->getName(); ?>.
    <button type="submit" name="logout" value="true">Logout</button><br>
    <ul>
        <?php
        foreach ($user->getTasks() as $task) {

            if($task->get_state()==='open'){
                echo '<li>'. $task->get_name() .
                    ' (' . $task->get_due()->format('d.m.Y h:i') . ')<button type="submit" name="setDone" value="' . $task->get_id() . '">erledigt</li>';
            }else{
                echo '<li style="text-decoration:line-through">'. $task->get_name() .
                    ' (' . $task->get_due()->format('d.m.Y h:i') . ')<button type="submit" name="setOpen" value="' . $task->get_id() . '">unerledigen</li>';
            }

        }
        ?>

    </ul>
</form>
</body>
</html>

