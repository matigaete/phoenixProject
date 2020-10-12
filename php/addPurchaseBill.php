<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonFactura = json_decode(file_get_contents("php://input"));
if (!$jsonFactura) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";

$sentencia = $bd->prepare("CALL insert_fact_compra(?,?,?,?,?,?,?)");

$resultado = $sentencia->execute([
    $jsonFactura->_codFactura, $jsonFactura->persona->_rut, $jsonFactura->_fecha,
    $jsonFactura->_hora, $jsonFactura->_neto, $jsonFactura->_iva, $jsonFactura->_total
]);

$arrayResultado = [];
foreach ($jsonFactura->_detalle as $detalle) { //foreach element in $arr
    $sentencia = $bd->prepare("CALL insert_detalle_fc(?,?,?,?,?,?)");

    $resultado = $sentencia->execute([
        $jsonFactura->_codFactura, $jsonFactura->persona->_rut,
        $detalle->_producto->codigo, $detalle->_cantidad,
        $detalle->_producto->precioCompra, $detalle->_subtotal
    ]);

    array_push($arrayResultado, $resultado);
}

echo json_encode([
    "resultado" => $resultado,
]);
