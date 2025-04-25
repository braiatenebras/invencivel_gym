<?php
class Database {
    private $host = "localhost";
    private $DBname = "exemplo_poo";
    private $username = "root";
    private $password = "";
    private $conn;

    public function __construct() {
        try {
            $this->conn = new PDO("mysql:host={$this->host};
            dbname={$this -> DBname}", $this -> username, $this -> password);

            
            $this -> conn -> setAttribute(PDO::ATTR_ERRMODE_EXCEPTION);
        } 
        catch (PDOException $e) {
            die("Erro de conexão: " . 
        $e->getMessage());
        }
    }

        public function getConexao() 
    {
        return $this -> conn;
    }
}
?>