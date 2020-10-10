-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-10-2020 a las 03:08:45
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_detalle_fv` (IN `codFac` VARCHAR(15), IN `codCli` VARCHAR(9), IN `codProd` VARCHAR(15), IN `cant` SMALLINT(3), IN `precioVenta` MEDIUMINT(6), IN `subtotal` MEDIUMINT(6))  BEGIN    
  DECLARE newCant SMALLINT(3); 
  INSERT INTO detalle_factura_venta
  VALUES (codFac, codCli, codProd, cant, precioVenta, subtotal);
  
  SELECT stock INTO newCant FROM producto 
    WHERE codigo = codProd;
    
  SET newCant = newCant - cant;
	
  UPDATE producto SET stock = newCant 
    WHERE codigo = codProd; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_fact_compra` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `fecha` DATE, IN `hora` TIME, IN `neto` MEDIUMINT(6), IN `iva` MEDIUMINT(6), IN `total` MEDIUMINT(6))  BEGIN     
  INSERT INTO factura_compra
  VALUES (codFac, codProv, fecha, hora, neto, iva, total);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_fact_venta` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `fecha` DATE, IN `hora` TIME, IN `neto` MEDIUMINT(6), IN `iva` MEDIUMINT(6), IN `total` MEDIUMINT(6))  BEGIN     
  INSERT INTO factura_venta
  VALUES (codFac, codProv, fecha, hora, neto, iva, total);
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
(5, 'Nueva categoria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `codigo_cliente` varchar(10) NOT NULL,
  `nombre_cliente` varchar(30) NOT NULL,
  `direccion_cliente` varchar(40) NOT NULL,
  `fono_cliente` varchar(9) NOT NULL,
  `correo_cliente` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
('323', '1323', '438732', 181, 1000, 10000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura_venta`
--

CREATE TABLE `detalle_factura_venta` (
  `codigo_factura_venta` varchar(15) NOT NULL,
  `codigo_cliente` varchar(9) NOT NULL,
  `codigo_producto` varchar(15) NOT NULL,
  `cantidad` smallint(5) NOT NULL,
  `precio_compra` mediumint(6) NOT NULL,
  `subtotal_factura` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_factura_venta`
--

INSERT INTO `detalle_factura_venta` (`codigo_factura_venta`, `codigo_cliente`, `codigo_producto`, `cantidad`, `precio_compra`, `subtotal_factura`) VALUES
('13221312', '21321', '1234', 1412, 25, 35200);

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
('132312', '12312', '2020-10-06', '20:10:51', 8766, 1666, 10432);

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
('13221312', '21321', '2020-10-08', '20:15:25', 35200, 6688, 41888);

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
('11111', 'TEST', 'dfdsfdfd', 2, 10, 15, 20, 25, 1),
('12312334', 'Elevador', 'Elevador de pana para llegar a la cima del mundo', 2, 100, 1, 100000, 500000, 0),
('1232154', 'Compresor de prueba', 'Compresor de pana para familia de pana', 1, 10, 1, 1000, 15000, 0),
('1234', 'TEST', 'sadddsadsa', 3, 0, 15, 20, 25, 1),
('12344', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 3000, 1),
('123441', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 25, 1),
('4321', 'Prueba de productos', 'JEJEJE', 1, 10, 0, 1000, 5000, 1),
('438732', 'Aceite', 'Aceite para freir de pana las sopaipas', 1, 9, 10, 50, 200, 1),
('4579843', 'Tractor', 'Pa pitiarse a todos los wones', 2, 5, 1, 500000, 5000000, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `codigo_proveedor` varchar(10) NOT NULL,
  `nombre_proveedor` varchar(30) NOT NULL,
  `direccion_proveedor` varchar(40) NOT NULL,
  `fono_proveedor` varchar(9) NOT NULL,
  `correo_proveedor` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
