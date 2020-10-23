<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonPersona = json_decode(file_get_contents("php://input"));  
if (!$jsonPersona) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
$sentencia = $bd->prepare("CALL insert_persona(?,?,?,?,?,?,?,?,?.?)");

$resultado = $sentencia->execute([
    $jsonPersona->_rut, $jsonPersona->_nombre, $jsonPersona->_giro,
    $jsonPersona->_region, $jsonPersona->_provincia, $jsonPersona->_comuna, 
    $jsonPersona->_direccion, $jsonPersona->_contacto, $jsonPersona->_email, 
    $jsonPersona->_tipo]);

echo json_encode([
    "resultado" => $resultado,
]);

?>