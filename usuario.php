<?PHP
class usuario {
    protect $DB;
    protect $Nome;
    protect $email;
    protect $senha;

    public function __construct($nome, $email, $senha) {
        $this -> DB = (new Database())
        
    ->getConnection();
    $this -> Nome = $nome;
    $this -> email = $email;
    $this -> senha = password_hash($senha, PASSWORD_DEFAULT);
    }

    public function salvar() {
        $SQL = "INSERT INTO usuarios (nome, email, senha, tipo)
        VALUES (:nome, :email, :senha, :usuario)";

        $STMT = $this -> DB -> prepare($SQL);
        $STMT->bindParam(':nome', $this->Nome);
        $STMT->bindParam(':email', $this->email);
        $STMT->bindParam(':senha', $this->senha);

        return $STMT -> execute();

    }

    public function login($email, $senha) {
        $SQL = "SELECT * FROM usuarios
        WHERE email = :email";
        $STMT = $this -> DB -> prepare($SQL);
        $STMT->bindParam(':email', $email);
        $STMT->execute();
        $usuario = $ ->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($senha, $usuario['senha'])) {

            return "login bem-sucedido. Bem-vindo " . $usuario['nome'];

            return "email ou senha incorretos";
        }
    }
}
?>