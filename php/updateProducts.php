<?php
header("Access-Control-Allow-Origin: http://localhost:80");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: *");
if ($_SERVER["REQUEST_METHOD"] != "PUT") {
    exit("Solo acepto peticiones PUT");
}
$jsonProductos = json_decode(file_get_contents("php://input"));
if (!$jsonProductos) {
    exit("No hay datos");
}

$bd = include_once "conexion.php";

$arrayResultado = [];
foreach ($jsonProductos as $productos) { //foreach element in $arr
    $sentencia = $bd->prepare(
        "UPDATE producto 
         SET stock = ?
         WHERE codigo = ?"
    );
    $resultado = $sentencia->execute([$productos->newCant, $productos->idProducto]);

    array_push($arrayResultado, $resultado);
}

echo json_encode([
    "resultado" => $arrayResultado,
]);
