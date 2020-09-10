-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-09-2020 a las 03:22:22
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
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `codigo_factura` varchar(15) NOT NULL,
  `codigo_proveedor` varchar(9) NOT NULL,
  `codigo_producto` varchar(15) NOT NULL,
  `cantidad` smallint(5) NOT NULL,
  `precio_compra` mediumint(6) NOT NULL,
  `subtotal_factura` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detalle_factura`
--

INSERT INTO `detalle_factura` (`codigo_factura`, `codigo_proveedor`, `codigo_producto`, `cantidad`, `precio_compra`, `subtotal_factura`) VALUES
('11', '120', '11111', 3, 1000, 3000),
('11', '120', '1234', 6, 1000, 6000),
('11', '120', '4321', 5, 4500, 22500),
('11', '120', '438732', 10, 6500, 65000),
('12', '132', '1234', 12, 1000, 12000),
('123', '132', '1234', 12, 1000, 12000),
('1232', '132', '1234', 12, 1000, 12000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `codigo_factura` varchar(15) NOT NULL,
  `codigo_proveedor` varchar(9) NOT NULL,
  `fecha_factura` date NOT NULL,
  `hora_factura` time NOT NULL,
  `total_compra` mediumint(6) NOT NULL,
  `tipo_factura` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`codigo_factura`, `codigo_proveedor`, `fecha_factura`, `hora_factura`, `total_compra`, `tipo_factura`) VALUES
('11', '120', '2020-09-08', '21:20:34', 96500, 'C'),
('12', '132', '2020-09-18', '22:17:55', 12000, 'C'),
('123', '132', '2020-09-18', '22:15:40', 12000, 'C'),
('1232', '132', '2020-09-18', '22:16:20', 12000, 'C');

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
('1234', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 25, 1),
('12344', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 3000, 1),
('123441', 'TEST', 'sadddsadsa', 3, 10, 15, 20, 25, 1),
('4321', 'Prueba de productos', 'JEJEJE', 1, 10, 0, 1000, 5000, 1),
('438732', 'Aceite', 'Aceite para freir de pana las sopaipas', 1, 100, 10, 50, 200, 1),
('4579843', 'Tractor', 'Pa pitiarse a todos los wones', 2, 5, 1, 500000, 5000000, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`codigo_factura`,`codigo_proveedor`,`codigo_producto`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`codigo_factura`,`codigo_proveedor`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `categoria` (`categoria`);

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
