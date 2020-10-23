<?php
header("Access-Control-Allow-Origin: http://localhost:80");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonProducto = json_decode(file_get_contents("php://input"));
if (!$jsonProducto) {
    exit("No hay datos");
}

$bd = include_once "conexion.php";
$sentencia = $bd->prepare("CALL actualiza_persona(?,?,?,?,?,?,?,?,?,?)");
$resultado = $sentencia->execute([
    $jsonPersona->_rut, $jsonPersona->_nombre, $jsonPersona->_giro,
    $jsonPersona->_region, $jsonPersona->_provincia, $jsonPersona->_comuna, 
    $jsonPersona->_direccion, $jsonPersona->_contacto, $jsonPersona->_email, 
    $jsonPersona->_tipo]);
    
echo json_encode($resultado);

?>