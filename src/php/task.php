<?php

class Task {
    //private variable: nicht wirklich nötig private - oder?
    private $user;
    private $name;
    private $description;
    private $state;
    private $due;
    private $id;

    //Task erstellen
    public function __construct($id = false) // dann beginnt er gar nicht erst auf der DB zu suchen
    {
        if($id){
            $statement = DB::get()->prepare('
              SELECT
                *
              FROM
                task
              WHERE
                id = :id');
        }

        $statement->execute([':id' => $id]);
        $task = $statement->fetch();

        $this->set_user($task['user_id']);
        $this->set_name($task['name']);
        $this->set_description($task['description']);
        $this->set_state($task['state']);
        $this->set_due(\Carbon\Carbon::parse($task['due']));
        // wegen Formatierung mit Carbon::parse, oben ohne use Carbon\Carbon; wegen "autoload"
        $this->set_id($task['id']);// task oder user??? -> nicht hier sondern in user.php
    }

    //Elemente: getters und setters
    public function get_user() {
        return $this->user;
    }
    public function set_user($user) {
        $this->user = $user;
    }

    public function get_name() {
        return $this->name;
    }
    public function set_name($name) {
        $this->name = $name;
    }
    public function get_description() {
        return $this->description;
    }
    public function set_description($description) {
        $this->description = $description;
    }
    public function get_state() {
        return $this->state;
    }
    public function set_state($state) {
        $this->state = $state;
    }
    public function get_due() {
        return $this->due;
    }
    public function set_due($due) {
        $this->due = $due;
    }

    public function get_id() {
        return $this->id;
    }
    public function set_id($id) {
        $this->id = $id;
    }


    public function update(){
        $statement = DB::get()->prepare('
              UPDATE
                task
              SET
                name = :name,
                description = :description,
                state = :state
              WHERE 
                id = :id
                ');

        $statement->execute([
            ':id' => $this->get_id(),
            ':name' => $this->get_name(),
            ':description' => $this->get_description(),
            ':state' => $this->get_state(),
        ]);
    }


    public function create(){
        $statement = DB::get()->prepare('
              INSERT INTO task
                (user_id,
                name,
                description,
                state_id,
                due)
              VALUES 
                (:user_id,
                :name,
                :description,
                :state_id,
                :due) 
                ');

        $statement->execute([
            ':user_id' => $this->getUser(),
            ':name' => $this->get_name(),
            ':description' => $this->get_description(),
            ':state' => $this->get_state(),
            ':due' => $this->get_due(),
        ]);

        // $task = new Task();
        //$task->setName('Mein neuer Task');
        //$task->create();
    }
}