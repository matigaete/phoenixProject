<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $bd = include_once "conexion.php";
  $sentencia = $bd->query("CALL busca_servicios()");
  $servicios = $sentencia->fetchAll(PDO::FETCH_OBJ);  
  echo json_encode($servicios);
?>