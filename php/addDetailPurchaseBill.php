<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$jsonDetalle = json_decode(file_get_contents("php://input"));
if (!$jsonDetalle) {
    exit("No hay datos");
}
$bd = include_once "conexion.php"; 
$arrayResultado = []; 
foreach ($jsonDetalle as $detalle) { //foreach element in $arr
    $sentencia = $bd->prepare("CALL insert_detalle_fc(?,?,?,?,?,?)");

    $resultado = $sentencia->execute([
        $detalle->_cod  Factura, $detalle->_codPersona, 
        $detalle->_codProducto, $detalle->_cantidad, 
        $detalle->_precioCompra, $detalle->_subtotal
    ]);

    array_push($arrayResultado, $resultado);
}

echo json_encode([
    "resultado" => $arrayResultado,
]);
