<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
  $bd = include_once "conexion.php";
  if ($_GET["codigo"] == "undefined") {
    $sentencia = $bd->query("CALL busca_lista_producto()"); 
  } elseif ($_GET["codigo"] == "all") {
    $sentencia = $bd->query("CALL busca_todo_productos()"); 
  } elseif ($_GET["codigo"] == "inactives") {
    $sentencia = $bd->query("CALL busca_productos_inactivos()"); 
  } else {
    $codigo = $_GET["codigo"];
    $sentencia = $bd->prepare("CALL busca_productos_por_categoria(?)");
    $sentencia->execute([$codigo]);  
  }
  $productos = $sentencia->fetchAll(PDO::FETCH_OBJ);  
  echo json_encode($productos);
?>