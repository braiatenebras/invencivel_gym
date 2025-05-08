php
<?php
require_once 'Database.php';

class Usuario {
    protected $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function login($email, $senha) {
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha'])) {
            return true;
        }
        return false;
    }
}
?>

