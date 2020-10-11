<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  if (empty($_GET["codigo"])) {
    exit("No existe persona");
  }
  $codigo = $_GET["codigo"];
  $bd = include_once "conexion.php";
  $sentencia = $bd->prepare("CALL busca_cliente(?)");

  $sentencia->execute([$codigo]); 
  $producto = $sentencia->fetchObject();  
  
  echo json_encode($producto);
?>