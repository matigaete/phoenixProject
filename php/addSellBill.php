<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonFactura = json_decode(file_get_contents("php://input"));
if (!$jsonFactura) {
    exit("No hay datos");
}
$bd = include_once "conexion.php";

$sentencia = $bd->prepare("CALL insert_fact_venta(?,?,?,?,?,?,?)");

$resultado = $sentencia->execute([
    $jsonFactura->_codFactura, $jsonFactura->_codPersona, $jsonFactura->_fecha,
    $jsonFactura->_hora, $jsonFactura->_neto, $jsonFactura->_iva, $jsonFactura->_total
]);

$arrayResultado = [];
foreach ($jsonFactura->_detalle as $detalle) { //foreach element in $arr
    $sentencia = $bd->prepare("CALL insert_detalle_fv(?,?,?,?,?,?)");

    $resultado = $sentencia->execute([
        $detalle->_codFactura, $detalle->_codPersona,
        $detalle->_producto->codigo, $detalle->_cantidad,
        $detalle->_producto->precioVenta, $detalle->_subtotal
    ]);

    array_push($arrayResultado, $resultado);
}

echo json_encode([
    "resultado" => $resultado,
]);
