<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonServicio = json_decode(file_get_contents("php://input"));  
if (!$jsonServicio) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
$sentencia = $bd->prepare("CALL insert_servicio(?,?,?,?)");

$resultado = $sentencia->execute([
    $jsonServicio->_codigo, $jsonServicio->_nombre, $jsonServicio->_descripcion, $jsonServicio->_precioVenta]);

echo json_encode([
    "resultado" => $resultado,
]);

?>