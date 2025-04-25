<? PHP
$ServerName = "Localhost";
$Username = "root";
$Password= “”;
$DBNome = "Meu banco";

$conn = New mySQL ($Servername,$username)

if ($conn -> connect _ERROR) {

Die ("falha na conexão: "- $conn -> conne)

}

Echo "conectado com sucesso!",

?>