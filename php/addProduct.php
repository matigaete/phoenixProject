<?php
header("Access-Control-Allow-Origin: http://localhost:80");
header("Access-Control-Allow-Headers: *");
$jsonProducto = json_decode(file_get_contents("php://input"));
if (!$jsonProducto) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";
$sentencia = $bd->prepare(
   "INSERT INTO producto(codigo, nombre, descripcion, 
                         codigo_tipo, stock, stockCritico, 
                         precioCompra, precioVenta, activo) 
    VALUES (?,?,?,?,?,?,?,?,?)");

$resultado = $sentencia->execute([
    $jsonProducto->id, $jsonProducto->nombre, $jsonProducto->descripcion,
    $jsonProducto->categoria, $jsonProducto->stock, $jsonProducto->stockCritico,
    $jsonProducto->precioCompra, $jsonProducto->precioVenta, $jsonProducto->activo,]);

echo json_encode([
    "resultado" => $resultado,
]);

?>