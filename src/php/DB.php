<?php

class DB
{
    private static $PDO;  // wenn dies public wäre, könnte er den ganzen PDO lesen
    public static function get()
    {
        if (!DB::$PDO) {
            DB::$PDO = new PDO('mysql:host=localhost;dbname=todo_app;charset=utf8mb4', 'root', 'root');
            return DB::$PDO;
        } else {
            return DB::$PDO;
        }
    }
}
class DB_optimized
{
    private static $PDO;
    public static function get()
    {
        return DB_optimized::$PDO ?: DB_optimized::$PDO = new PDO('mysql:host=localhost;dbname=todo_app;charset=utf8mb4', 'root', 'root');
    }
}