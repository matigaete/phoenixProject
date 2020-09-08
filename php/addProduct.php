<?php
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonProducto = json_decode(file_get_contents("php://input"));  
if (!$jsonProducto) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
$sentencia = $bd->prepare(
   "INSERT INTO producto(codigo, nombre, descripcion, 
                         categoria, stock, stockCritico, 
                         precioCompra, precioVenta, activo) 
    VALUES (?,?,?,?,?,?,?,?,?)");

$resultado = $sentencia->execute([
    $jsonProducto->_codigo, $jsonProducto->_nombre, $jsonProducto->_descripcion,
    $jsonProducto->_tipo, $jsonProducto->_stock, $jsonProducto->_stockCritico,
    $jsonProducto->_precioCompra, $jsonProducto->_precioVenta, 1]);

echo json_encode([
    "resultado" => $resultado,
]);

?>