<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  if (empty($_GET["codigo"])) {
    exit("No existe producto");
  }
  $codigo = $_GET["codigo"];
  $bd = include_once "conexion.php";
  $sentencia = $bd->prepare("select * from producto where codigo = ?");
  $sentencia->execute([$codigo]);
  $producto = $sentencia->fetchObject();  
  echo json_encode($producto);
?>