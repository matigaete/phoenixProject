<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
  $bd = include_once "conexion.php";

  $codigo = $_GET["codigo"];
  $sentencia = $bd->prepare("CALL busca_comunas_por_provincia(?)");
  $sentencia->execute([$codigo]);  
  
  $provincias = $sentencia->fetchAll(PDO::FETCH_OBJ);  
  echo json_encode($provincias);
?>