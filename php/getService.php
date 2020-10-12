<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  if (empty($_GET["codigo"])) {
    exit("No existe servicio");
  }
  $codigo = $_GET["codigo"];
  $bd = include_once "conexion.php";
  $sentencia = $bd->prepare("CALL busca_servicio(?)");

  $sentencia->execute([$codigo]); 
  $servicio = $sentencia->fetchObject();  
  
  echo json_encode($servicio);
?>