<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonCategoria = json_decode(file_get_contents("php://input"));  
if (!$jsonCategoria) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
$sentencia = $bd->prepare("CALL insert_categoria(?)");
$resultado = $sentencia->execute([$jsonCategoria->_tipo]);

echo json_encode([
    "resultado" => $resultado,
]);

?>