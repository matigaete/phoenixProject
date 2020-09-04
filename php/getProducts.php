<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $bd = include_once "conexion.php";
  if ($_GET["codigo"] == "undefined") {
    $sentencia = $bd->query(
      "SELECT p.codigo, p.nombre, p.descripcion, 
              p.categoria AS tipo, p.stock, p.stockCritico, 
              p.precioCompra, p.precioVenta, p.activo 
       FROM producto AS p  
       WHERE p.activo = true"); 
  } elseif ($_GET["codigo"] == "all") {
    $sentencia = $bd->query(
      "SELECT p.codigo, p.nombre, p.descripcion, 
              c.tipo, p.stock, p.stockCritico, 
              p.precioCompra, p.precioVenta, p.activo 
       FROM producto AS p
       LEFT JOIN categoria AS c ON p.categoria = c.codigo 
       WHERE p.activo = true"); 
  } else {
    $codigo = $_GET["codigo"];
    $sentencia = $bd->prepare(
      "SELECT p.nombre, p.descripcion, p.categoria AS tipo, 
              p.stock, p.stockCritico, p.precioCompra, 
              p.precioVenta, p.activo, p.codigo
      FROM producto AS p        
      WHERE p.activo = true AND p.categoria = ?");
 
    $sentencia->execute([$codigo]);  
  }
  $productos = $sentencia->fetchAll(PDO::FETCH_OBJ); 
  echo json_encode($productos);
?>