<?php
header("Access-Control-Allow-Origin: http://localhost:80");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonServicio = json_decode(file_get_contents("php://input"));
if (!$jsonServicio) {
    exit("No hay datos");
}

$bd = include_once "conexion.php";
$sentencia = $bd->prepare("CALL actualiza_servicio(?,?,?,?)");
$resultado = $sentencia->execute([
    $jsonServicio->_codigo, $jsonServicio->_nombre, $jsonServicio->_descripcion, $jsonServicio->_precioVenta]);
    
echo json_encode($resultado);

?>