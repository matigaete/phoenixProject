-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2020 a las 02:25:37
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `technicaldb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `activa_producto` (IN `codProd` VARCHAR(15))  BEGIN    
  UPDATE producto 
    SET activo = 1
    WHERE codigo = codProd;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualiza_categoria` (IN `codCat` TINYINT(4), IN `nombre` VARCHAR(20))  BEGIN    
  UPDATE categoria 
    SET tipo = nombre
    WHERE codigo = codCat;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualiza_producto` (IN `codProd` VARCHAR(15), IN `nomProd` VARCHAR(50), IN `descProd` TEXT, IN `categ` TINYINT(4), IN `stock` SMALLINT(6), IN `stockC` TINYINT(4), IN `precioC` MEDIUMINT(9), IN `precioV` MEDIUMINT(9), IN `activo` TINYINT(1))  BEGIN    
	UPDATE producto 
    SET nombre = nomProd, descripcion = descProd, categoria = categ, 
        stock = stock, stockCritico = stockC, precioCompra = precioC,
        precioVenta = precioV, activo = activo
    WHERE codigo = codProd ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualiza_servicio` (IN `codServ` VARCHAR(15), IN `nomServ` VARCHAR(50), IN `descServ` TEXT, IN `precioV` MEDIUMINT(9))  BEGIN    
	UPDATE servicio
    SET nombre = nomServ, descripcion = descServ, precioVenta = precioV
    WHERE codigo = codServ ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `baja_producto` (IN `codProd` VARCHAR(15))  BEGIN    
  UPDATE producto 
    SET activo = 0
    WHERE codigo = codProd;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_categorias` ()  BEGIN    
  SELECT codigo, tipo FROM categoria;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_cliente` (IN `rut` VARCHAR(9))  BEGIN 
  SELECT codigo_cliente AS rut,
  	     nombre_cliente AS nombre,
         giro_cliente AS giro,
         ciudad_cliente AS ciudad,
         comuna_cliente AS comuna,
         direccion_cliente AS direccion,
         fono_cliente AS contacto,
         mail_cliente AS email,
         'C' AS tipo
    FROM clientes 
    WHERE codigo_cliente = rut;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_clientes_por_rut` (IN `rut` VARCHAR(9))  BEGIN   
  SELECT codigo_cliente AS rut,
  	     nombre_cliente AS nombre,
         giro_cliente AS giro,
         ciudad_cliente AS ciudad,
         comuna_cliente AS comuna,
         direccion_cliente AS direccion,
         fono_cliente AS contacto,
         mail_cliente AS email,
         'C' AS tipo
    FROM clientes 
    WHERE codigo_cliente LIKE rut
    LIMIT 5;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_lista_producto` ()  BEGIN    
  SELECT p.codigo, p.nombre, p.descripcion, 
              p.categoria AS tipo, p.stock, p.stockCritico, 
              p.precioCompra, p.precioVenta, p.activo 
       FROM producto AS p  
       WHERE p.activo = true;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_producto` (IN `codProd` VARCHAR(15))  BEGIN    
  SELECT p.nombre, p.descripcion, c.tipo, 
         p.stock, p.stockCritico, p.precioCompra, 
         p.precioVenta, p.activo, p.codigo
    FROM producto AS p
    LEFT JOIN categoria AS c ON p.categoria = c.codigo        
    WHERE p.codigo = codProd
      AND p.activo = true;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_productos_inactivos` ()  BEGIN    
  SELECT p.codigo, p.nombre, c.tipo, p.stock
       FROM producto AS p
       LEFT JOIN categoria AS c ON p.categoria = c.codigo 
       WHERE p.activo = false;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_productos_por_categoria` (IN `codCat` TINYINT(4))  BEGIN    
  SELECT p.nombre, p.descripcion, p.categoria AS tipo, 
              p.stock, p.stockCritico, p.precioCompra, 
              p.precioVenta, p.activo, p.codigo
      FROM producto AS p        
      WHERE p.activo = true AND p.categoria = codCat;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_proveedor` (IN `rut` VARCHAR(9))  BEGIN     
  SELECT codigo_proveedor AS rut,
  	     nombre_proveedor AS nombre,
         giro_proveedor AS giro,
         ciudad_proveedor AS ciudad,
         comuna_proveedor AS comuna,
         direccion_proveedor AS direccion,
         fono_proveedor AS contacto,
         mail_proveedor AS email,
         'P' AS tipo
    FROM proveedores
    WHERE codigo_proveedor = rut; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_proveedores_por_rut` (IN `rut` VARCHAR(9))  BEGIN     
  SELECT codigo_proveedor AS rut,
  	     nombre_proveedor AS nombre,
         giro_proveedor AS giro,
         ciudad_proveedor AS ciudad,
         comuna_proveedor AS comuna,
         direccion_proveedor AS direccion,
         fono_proveedor AS contacto,
         mail_proveedor AS email,
         'P' AS tipo
    FROM proveedores
    WHERE codigo_proveedor LIKE rut
    LIMIT 5; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_servicio` (IN `codServ` VARCHAR(15))  BEGIN    
  SELECT nombre, descripcion,
         precioVenta, codigo
    FROM servicio 
    WHERE codigo = codServ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_servicios` ()  BEGIN    
  SELECT * FROM servicio;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_todo_productos` ()  BEGIN    
  SELECT p.codigo, p.nombre, p.descripcion, 
              c.tipo, p.stock, p.stockCritico, 
              p.precioCompra, p.precioVenta, p.activo 
       FROM producto AS p
       LEFT JOIN categoria AS c ON p.categoria = c.codigo 
       WHERE p.activo = true;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_categoria` (IN `nombre` VARCHAR(20))  BEGIN    
  INSERT INTO categoria(tipo) 
    VALUES (nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_detalle_fc` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `codProd` VARCHAR(15), IN `cant` SMALLINT(3), IN `precioCompra` MEDIUMINT(6), IN `subtotal` MEDIUMINT(6))  BEGIN    
  DECLARE newCant SMALLINT(3); 
  INSERT INTO detalle_factura_compra
  VALUES (codFac, codProv, codProd, cant, precioCompra, subtotal);
  
  SELECT stock INTO newCant FROM producto 
    WHERE codigo = codProd;
    
  SET newCant = newCant + cant;
	
  UPDATE producto SET stock = newCant 
    WHERE codigo = codProd; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_detalle_fv` (IN `codFac` VARCHAR(15), IN `codCli` VARCHAR(9), IN `codProd` VARCHAR(15), IN `tipo` VARCHAR(1), IN `cant` SMALLINT(3), IN `precioVenta` MEDIUMINT(6), IN `subtotal` MEDIUMINT(6))  BEGIN    
  DECLARE newCant SMALLINT(3); 
  INSERT INTO detalle_factura_venta
  VALUES (codFac, codCli, codProd, cant, tipo, precioVenta, subtotal);
  
  IF tipo = 'P' THEN
      SELECT stock INTO newCant FROM producto 
        WHERE codigo = codProd;

      SET newCant = newCant - cant;

      UPDATE producto SET stock = newCant 
        WHERE codigo = codProd; 
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_fact_compra` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `fecha` DATE, IN `hora` TIME, IN `neto` MEDIUMINT(6), IN `iva` MEDIUMINT(6), IN `total` MEDIUMINT(6))  BEGIN     
  INSERT INTO factura_compra
  VALUES (codFac, codProv, fecha, hora, neto, iva, total);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_fact_venta` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `fecha` DATE, IN `hora` TIME, IN `neto` MEDIUMINT(6), IN `iva` MEDIUMINT(6), IN `total` MEDIUMINT(6))  BEGIN     
  INSERT INTO factura_venta
  VALUES (codFac, codProv, fecha, hora, neto, iva, total);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_producto` (IN `codProd` VARCHAR(15), IN `nomProd` VARCHAR(50), IN `descProd` TEXT, IN `categ` TINYINT(4), IN `stock` SMALLINT(6), IN `stockC` TINYINT(4), IN `precioC` MEDIUMINT(9), IN `precioV` MEDIUMINT(9))  BEGIN    
  INSERT INTO producto VALUES (codProd,nomProd,descProd,categ,stock,stockC,precioC,precioV,1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_servicio` (IN `codServ` VARCHAR(15), IN `nomServ` VARCHAR(50), IN `descServ` TEXT, IN `precioV` MEDIUMINT(9))  BEGIN    
  INSERT INTO servicio VALUES (codServ,nomServ,descServ,precioV);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `codigo` tinyint(4) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`codigo`, `tipo`) VALUES
(1, 'Herramienta'),
(2, 'Maquina'),
(3, 'Grasas'),
(4, 'Prueba'),
(5, 'Cambio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `codigo_cliente` varchar(9) NOT NULL,
  `nombre_cliente` varchar(30) NOT NULL,
  `giro_cliente` varchar(50) NOT NULL,
  `ciudad_cliente` varchar(30) NOT NULL,
  `comuna_cliente` varchar(30) NOT NULL,
  `direccion_cliente` varchar(40) NOT NULL,
  `fono_cliente` varchar(9) NOT NULL,
  `mail_cliente` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`codigo_cliente`, `nombre_cliente`, `giro_cliente`, `ciudad_cliente`, `comuna_cliente`, `direccion_cliente`, `fono_cliente`, `mail_cliente`) VALUES
('199540513', 'Matias Gaete', 'EMPRENDIMIENTO DE SOFTWARE', 'Santiago', 'San Bernardo', 'Los pistachos 2155', '966067120', 'matias.gaetep@sansano.usm.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_compra`
--

CREATE TABLE `detalle_factura_compra` (
  `codigo_factura_compra` varchar(15) NOT NULL,
  `codigo_proveedor` varchar(9) NOT NULL,
  `codigo_producto` varchar(15) NOT NULL,
  `cantidad` smallint(5) NOT NULL,
  `precio_compra` mediumint(6) NOT NULL,
  `subtotal_factura` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_factura_compra`
--

INSERT INTO `detalle_factura_compra` (`codigo_factura_compra`, `codigo_proveedor`, `codigo_producto`, `cantidad`, `precio_compra`, `subtotal_factura`) VALUES
('11', '11', '1234', 5, 1000, 5000),
('11', '120', '11111', 3, 1000, 3000),
('11', '120', '1234', 6, 1000, 6000),
('11', '120', '4321', 5, 4500, 22500),
('11', '120', '438732', 10, 6500, 65000),
('112', '112', '1234', 5, 1000, 5000),
('112', '222', '1234', 1, 1000, 5000),
('113', '123', '1234', 5, 1000, 5000),
('113212', '12312', '1234', 1292, 100, 129100),
('12', '132', '1234', 12, 1000, 12000),
('123', '132', '1234', 12, 1000, 12000),
('12312', '1233', '438732', 90, 1000, 90000),
('1232', '132', '1234', 12, 1000, 12000),
('12321', '2131', '1234', 10, 1000, 9900),
('132312', '12312', '1234', 100, 100, 8766),
('321123', '132312', '11111', 15, 20, 300),
('321123', '132312', '1234', 10, 20, 250),
('321123', '132312', '4321', 40, 1000, 195000),
('321123', '132312', '438732', 12, 50, 2000),
('323', '1323', '438732', 181, 1000, 10000),
('4321', '4321', '11111', 10, 20, 250),
('4321', '4321', '1234', 10, 20, 250),
('4321', '4321', '438732', 10, 50, 2000),
('44444', '444444', '1234', 1000, 20, 25000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_venta`
--

CREATE TABLE `detalle_factura_venta` (
  `codigo_factura_venta` varchar(15) NOT NULL,
  `codigo_cliente` varchar(9) NOT NULL,
  `codigo_producto` varchar(15) NOT NULL,
  `cantidad` smallint(5) NOT NULL,
  `tipo` varchar(1) NOT NULL,
  `precio_compra` mediumint(6) NOT NULL,
  `subtotal_factura` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_factura_venta`
--

INSERT INTO `detalle_factura_venta` (`codigo_factura_venta`, `codigo_cliente`, `codigo_producto`, `cantidad`, `tipo`, `precio_compra`, `subtotal_factura`) VALUES
('13221312', '21321', '1234', 1412, '', 25, 35200),
('123456789', '123456789', '12345', 0, '3', 4000, 16000),
('88888', '88888', '1234', 0, '1', 25, 250),
('88888', '88888', '32123', 0, '1', 50000, 50000),
('88888', '88888', '438732', 0, '5', 200, 10000),
('999999', '999999', '12344', 0, '1', 3000, 30000),
('999999', '999999', '12345', 0, '1', 5600, 100800),
('999999', '999999', '32123', 0, '1', 50000, 50000),
('10101010', '1010101', '1234', 20, 'P', 25, 500),
('10101010', '1010101', '438732', 30, 'P', 200, 6000),
('10101010', '1010101', '32123', 1, 'S', 50000, 50000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_compra`
--

CREATE TABLE `factura_compra` (
  `codigo_factura_compra` varchar(15) NOT NULL,
  `codigo_proveedor` varchar(9) NOT NULL,
  `fecha_factura` date NOT NULL,
  `hora_factura` time NOT NULL,
  `monto_neto` mediumint(6) NOT NULL,
  `iva` mediumint(6) NOT NULL,
  `total_compra` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura_compra`
--

INSERT INTO `factura_compra` (`codigo_factura_compra`, `codigo_proveedor`, `fecha_factura`, `hora_factura`, `monto_neto`, `iva`, `total_compra`) VALUES
('11', '120', '2020-09-08', '21:20:34', 0, 0, 96500),
('113212', '12312', '2020-10-05', '20:16:31', 129100, 24529, 153629),
('12', '132', '2020-09-18', '22:17:55', 0, 0, 12000),
('123', '132', '2020-09-18', '22:15:40', 0, 0, 12000),
('1232', '132', '2020-09-18', '22:16:20', 0, 0, 12000),
('132312', '12312', '2020-10-06', '20:10:51', 8766, 1666, 10432),
('321123', '132312', '2020-10-08', '14:19:20', 0, 0, 0),
('4321', '4321', '2020-09-08', '16:33:50', 2500, 475, 2975),
('44444', '444444', '2020-09-08', '16:40:43', 25000, 4750, 29750);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_venta`
--

CREATE TABLE `factura_venta` (
  `codigo_factura_venta` varchar(15) NOT NULL,
  `codigo_cliente` varchar(9) NOT NULL,
  `fecha_factura` date NOT NULL,
  `hora_factura` time NOT NULL,
  `monto_neto` mediumint(6) NOT NULL,
  `iva` mediumint(6) NOT NULL,
  `total_compra` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura_venta`
--

INSERT INTO `factura_venta` (`codigo_factura_venta`, `codigo_cliente`, `fecha_factura`, `hora_factura`, `monto_neto`, `iva`, `total_compra`) VALUES
('13221312', '21321', '2020-10-08', '20:15:25', 35200, 6688, 41888),
('321123', '132312', '2020-10-08', '15:42:47', 22075, 0, 0),
('123456789', '123456789', '2020-10-07', '00:42:51', 16000, 3040, 19040),
('123456789', '123456789', '2020-10-07', '00:43:18', 16000, 3040, 19040),
('66666', '666666', '2020-10-07', '02:10:36', 60250, 11448, 71698),
('88888', '88888', '2020-10-07', '02:13:12', 60250, 11448, 71698),
('999999', '999999', '2020-10-13', '02:18:04', 180800, 34352, 215152),
('10101010', '1010101', '2020-10-11', '02:23:04', 56500, 10735, 67235);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `codigo` varchar(15) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `categoria` tinyint(4) NOT NULL,
  `stock` smallint(6) NOT NULL,
  `stockCritico` tinyint(4) NOT NULL,
  `precioCompra` mediumint(9) NOT NULL,
  `precioVenta` mediumint(9) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`codigo`, `nombre`, `descripcion`, `categoria`, `stock`, `stockCritico`, `precioCompra`, `precioVenta`, `activo`) VALUES
('100000', 'dsdsada', 'sadd', 1, 10, 15, 20, 25, 0),
('11111', 'TEST', 'dfdsfdfd', 2, 35, 15, 20, 25, 1),
('12312334', 'Elevador', 'Elevador de pana para llegar a la cima del mundo', 2, 100, 1, 100000, 500000, 0),
('1232154', 'Compresor de prueba', 'Compresor de pana para familia de pana', 1, 10, 1, 1000, 15000, 0),
('1234', 'TEST', 'sadddsadsa', 3, 990, 15, 20, 25, 1),
('12344', 'TEST', 'sadddsadsa', 3, 0, 15, 20, 3000, 1),
('123441', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 25, 1),
('12345', 'Tuerca de piedra', 'Es una pruebanomas asi que no se me ocurre descripción', 1, 29, 30, 4000, 5600, 1),
('4321', 'Prueba de productos', 'JEJEJE', 1, 50, 0, 1000, 5000, 1),
('438732', 'Aceite', 'Aceite para freir de pana las sopaipas', 1, -49, 10, 50, 200, 1),
('4579843', 'Tractor', 'Pa pitiarse a todos los wones', 2, 5, 1, 500000, 5000000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `codigo_proveedor` varchar(9) NOT NULL,
  `nombre_proveedor` varchar(30) NOT NULL,
  `giro_proveedor` varchar(50) NOT NULL,
  `ciudad_proveedor` varchar(30) NOT NULL,
  `comuna_proveedor` varchar(30) NOT NULL,
  `direccion_proveedor` varchar(40) NOT NULL,
  `fono_proveedor` varchar(9) NOT NULL,
  `mail_proveedor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`codigo_proveedor`, `nombre_proveedor`, `giro_proveedor`, `ciudad_proveedor`, `comuna_proveedor`, `direccion_proveedor`, `fono_proveedor`, `mail_proveedor`) VALUES
('773128493', 'TECHNICAL SERVICE', 'SERVICIO TÉCNICO AUTOMOTRIZ', 'Santiago', 'San Bernardo', 'Los pistachos 2155', '660505005', 'marcelo.gaete@text.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `codigo` varchar(15) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `precioVenta` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`codigo`, `nombre`, `descripcion`, `precioVenta`) VALUES
('12346', 'SERVICIO DE LAVADO', 'LAVADO EN EL ANO BIEN BUENO', 40000),
('32123', 'Instalación de maquina', 'Dejé de pana la maquina culia', 50000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`codigo_cliente`);

--
-- Indices de la tabla `detalle_factura_compra`
--
ALTER TABLE `detalle_factura_compra`
  ADD PRIMARY KEY (`codigo_factura_compra`,`codigo_proveedor`,`codigo_producto`);

--
-- Indices de la tabla `factura_compra`
--
ALTER TABLE `factura_compra`
  ADD PRIMARY KEY (`codigo_factura_compra`,`codigo_proveedor`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`codigo_proveedor`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `codigo` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
