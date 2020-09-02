<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  if (empty($_GET["codigo"])) {
    exit("No existe producto");
  }
  $codigo = $_GET["codigo"];
  $bd = include_once "conexion.php";
  $sentencia = $bd->prepare(
   "SELECT p.nombre, p.descripcion, c.tipo, 
           p.stock, p.stockCritico, p.precioCompra, 
           p.precioVenta, p.activo, p.codigo
    FROM producto AS p
    LEFT JOIN categoria AS c ON p.categoria = c.codigo        
    WHERE p.codigo = ?");

  $sentencia->execute([$codigo]); 
  $producto = $sentencia->fetchObject();  
  
  echo json_encode($producto);
?>