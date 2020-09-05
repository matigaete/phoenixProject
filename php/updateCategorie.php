<?php
header("Access-Control-Allow-Origin: http://localhost:80");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonCategoria = json_decode(file_get_contents("php://input"));
if (!$jsonCategoria) {
    exit("No hay datos");
}

$bd = include_once "conexion.php";
$sentencia = $bd->prepare(
   "UPDATE categoria 
    SET tipo = ?
    WHERE codigo = ?");
$resultado = $sentencia->execute([$jsonCategoria->_tipo, $jsonCategoria->_codigo]);
    
echo json_encode($resultado);

?>