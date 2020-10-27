<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $bd = include_once "conexion.php";
  $sentencia = $bd->query("CALL busca_ultima_factura()");
  $nroFactura = $sentencia->fetchObject();  
  echo json_encode($nroFactura);
?>