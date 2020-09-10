<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonFactura = json_decode(file_get_contents("php://input"));  
if (!$jsonFactura) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
 
$sentencia = $bd->prepare(
   "CALL `INSERTA_FACTURA`(?, ?, ?, ?, ?, ?);");

$resultado = $sentencia->execute([
    $jsonFactura->_codigoFactura, $jsonFactura->_codProveedor, $jsonFactura->_fecha,
    $jsonFactura->_hora, $jsonFactura->_total, $jsonFactura->_tipo]);

echo json_encode([
    "resultado" => $resultado,
]);

?>