-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-10-2020 a las 22:57:04
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `actualiza_persona` (IN `rut` VARCHAR(9), IN `nom` VARCHAR(30), IN `giro` VARCHAR(50), IN `region` INT(11), IN `provincia` INT(11), IN `comuna` INT(11), IN `direccion` VARCHAR(40), IN `fono` VARCHAR(9), IN `mail` TEXT, IN `tipo` VARCHAR(1))  BEGIN    
	IF tipo = 'P' THEN
    	UPDATE proveedores
        SET nombre_proveedor = nom, giro_proveedor = giro, region_proveedor = region, 
            provincia_proveedor = provincia, comuna_proveedor = comuna, direccion_proveedor = direccion,
            fono_proveedor = fono, mail_proveedor = mail
        WHERE codigo_proveedor = rut ;
    ELSE
    	UPDATE clientes
        SET nombre_cliente = nom, giro_cliente = giro, region_cliente = region, 
            provincia_cliente = provincia, comuna_cliente = comuna, direccion_cliente = direccion,
            fono_cliente = fono, mail_cliente = mail
        WHERE codigo_cliente = rut ;
    END IF;
	
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
  SELECT c.codigo_cliente AS rut,
  	     c.nombre_cliente AS nombre,
         c.giro_cliente AS giro,
         r.region AS region,
         p.provincia AS provincia,
         x.comuna AS comuna,
         c.direccion_cliente AS direccion,
         c.fono_cliente AS contacto,
         c.mail_cliente AS email,
         'C' AS tipo
    FROM clientes AS c
    INNER JOIN regiones AS r ON c.region_cliente = r.id
    INNER JOIN provincias AS p ON c.provincia_cliente = p.id 
    INNER JOIN comunas AS x ON c.comuna_cliente = x.id 
    WHERE codigo_cliente = rut;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_clientes` ()  BEGIN 
  SELECT codigo_cliente AS rut,
  	     nombre_cliente AS nombre,
         giro_cliente AS giro,
         region_cliente AS region,
         provincia_cliente AS provincia,
         comuna_cliente AS comuna,
         direccion_cliente AS direccion,
         fono_cliente AS contacto,
         mail_cliente AS email,
         'C' AS tipo
    FROM clientes;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_clientes_por_rut` (IN `rut` VARCHAR(9))  BEGIN   
  SELECT codigo_cliente AS rut,
  	     nombre_cliente AS nombre,
         giro_cliente AS giro, 
         region_cliente AS region,
         provincia_cliente AS provincia,
         direccion_cliente AS direccion,
         fono_cliente AS contacto,
         mail_cliente AS email,
         'C' AS tipo
    FROM clientes 
    WHERE codigo_cliente LIKE rut
    LIMIT 5;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_comunas_por_provincia` (IN `codProv` INT(11))  BEGIN    		
	SELECT id, comuna FROM comunas WHERE provincia_id = codProv;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_lista_producto` ()  BEGIN    
  SELECT p.codigo, p.nombre, p.descripcion, 
  		 p.categoria AS tipo, p.stock, p.stockCritico, 
         MAX(r.precio) AS precioCompra, p.precioVenta, p.activo
       FROM producto AS p  
       INNER JOIN precio AS r ON r.codigo_producto = p.codigo
       WHERE p.activo = true
       GROUP BY p.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_producto` (IN `codProd` VARCHAR(15))  BEGIN          
  SELECT p.nombre, p.descripcion, c.tipo, 
  		 p.stock, p.stockCritico, MAX(r.precio) AS precioCompra, 
         p.precioVenta, 
         p.activo, p.codigo
    FROM producto AS p
    INNER JOIN precio AS r ON p.codigo = r.codigo_producto
    INNER JOIN categoria AS c ON p.categoria = c.codigo 
    WHERE p.codigo = codProd
      AND p.activo = true
    GROUP BY p.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_productos_inactivos` ()  BEGIN    
  SELECT p.codigo, p.nombre, c.tipo, p.stock
       FROM producto AS p
       LEFT JOIN categoria AS c ON p.categoria = c.codigo 
       WHERE p.activo = false;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_productos_por_categoria` (IN `codCat` TINYINT(4))  BEGIN    
  SELECT p.nombre, p.descripcion, p.categoria AS tipo, 
         p.stock, p.stockCritico, MAX(r.precio) AS precioCompra, 
         p.precioVenta, 
         p.activo, p.codigo
    FROM producto AS p
    INNER JOIN precio AS r ON p.codigo = r.codigo_producto
    WHERE p.activo = true AND p.categoria = codCat
    GROUP BY p.codigo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_proveedor` (IN `rut` VARCHAR(9))  BEGIN      
  SELECT p.codigo_proveedor AS rut,
  	     p.nombre_proveedor AS nombre,
         p.giro_proveedor AS giro,
         r.region AS region,
         x.provincia AS provincia,
         c.comuna AS comuna,
         p.direccion_proveedor AS direccion,
         p.fono_proveedor AS contacto,
         p.mail_proveedor AS email,
         'P' AS tipo
    FROM proveedores AS p
    INNER JOIN regiones AS r ON c.region_cliente = r.id
    INNER JOIN provincias AS x ON c.provincia_cliente = p.id 
    INNER JOIN comunas AS c ON c.comuna_cliente = x.id 
    WHERE p.codigo_proveedor = rut;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_proveedores` ()  BEGIN     
  SELECT codigo_proveedor AS rut,
  	     nombre_proveedor AS nombre,
         giro_proveedor AS giro,
         region_proveedor AS region,
         provincia_proveedor AS provincia,
         comuna_proveedor AS comuna,
         direccion_proveedor AS direccion,
         fono_proveedor AS contacto,
         mail_proveedor AS email,
         'P' AS tipo
    FROM proveedores; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_proveedores_por_rut` (IN `rut` VARCHAR(9))  BEGIN     
  SELECT codigo_proveedor AS rut,
  	     nombre_proveedor AS nombre,
         giro_proveedor AS giro,
         region_proveedor AS region,
         provincia_proveedor AS provincia,
         comuna_proveedor AS comuna,
         direccion_proveedor AS direccion,
         fono_proveedor AS contacto,
         mail_proveedor AS email,
         'P' AS tipo
    FROM proveedores
    WHERE codigo_proveedor LIKE rut
    LIMIT 5; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_provincias_por_region` (IN `codReg` INT(11))  BEGIN
	SELECT id, provincia FROM provincias WHERE region_id = codReg;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `busca_regiones` ()  BEGIN    
  SELECT id, abreviatura, region, capital FROM regiones;
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
         MAX(r.precio) AS precioCompra, p.precioVenta, p.activo
       FROM producto AS p  
       INNER JOIN precio AS r ON r.codigo_producto = p.codigo
       INNER JOIN categoria AS c ON p.categoria = c.codigo 
       WHERE p.activo = true
       GROUP BY p.codigo;     
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_categoria` (IN `nombre` VARCHAR(20))  BEGIN    
  INSERT INTO categoria(tipo) 
    VALUES (nombre);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_detalle_fc` (IN `codFac` VARCHAR(15), IN `codProv` VARCHAR(9), IN `codProd` VARCHAR(15), IN `cant` SMALLINT(3), IN `precioCompra` MEDIUMINT(6), IN `subtotal` MEDIUMINT(6))  BEGIN    
  DECLARE newCant SMALLINT(3); 
  DECLARE newPrice MEDIUMINT(6); 
  DECLARE tasa DECIMAL(10,2);
  DECLARE maxPrecio MEDIUMINT(6);
  
  INSERT INTO detalle_factura_compra
  VALUES (codFac, codProv, codProd, cant, precioCompra, subtotal);
  
  SELECT stock, tasaCambio INTO newCant, tasa FROM producto 
    WHERE codigo = codProd;
    
  SELECT MAX(precio) INTO maxPrecio FROM precio 
  	WHERE codigo_producto = codProd;
  
  IF precioCompra < maxPrecio THEN
  	SET newPrice = maxPrecio + maxPrecio * (tasa / 100);
  ELSE
  	SET newPrice = precioCompra + precioCompra * (tasa / 100);
  END IF;
  
  SET newCant = newCant + cant;
	
  INSERT INTO precio (codigo_producto, fecha, precio)
	VALUES (codProd, CURDATE(), precioCompra);
  
  UPDATE producto SET stock = newCant,
  				      precioVenta = newPrice
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_persona` (IN `rut` VARCHAR(9), IN `nom` VARCHAR(30), IN `giro` VARCHAR(50), IN `region` INT(11), IN `provincia` INT(11), IN `comuna` INT(11), IN `direccion` VARCHAR(40), IN `fono` VARCHAR(9), IN `mail` TEXT, IN `tipo` VARCHAR(1))  BEGIN    
	IF tipo = 'P' THEN
  		INSERT INTO proveedores VALUES (rut,nom,giro,region,provincia,comuna,direccion,fono,email);
  	ELSE 
    	INSERT INTO clientes VALUES (rut,nom,giro,region,provincia,comuna,direccion,fono,email);
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_producto` (IN `codProd` VARCHAR(15), IN `nomProd` VARCHAR(50), IN `descProd` TEXT, IN `categ` TINYINT(4), IN `stock` SMALLINT(6), IN `stockC` TINYINT(4), IN `precioC` MEDIUMINT(9), IN `tasaCambio` DECIMAL(10,2), IN `precioV` MEDIUMINT(9))  BEGIN    
  INSERT INTO producto VALUES (codProd,nomProd,descProd,categ,stock,stockC,tasaCambio,precioV,1);
  INSERT INTO precio (codigo_producto, fecha, precio)
VALUES (codProd, CURDATE(), precioC);
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
  `region_cliente` int(11) NOT NULL,
  `provincia_cliente` int(11) NOT NULL,
  `comuna_cliente` int(11) NOT NULL,
  `direccion_cliente` varchar(40) NOT NULL,
  `fono_cliente` varchar(9) NOT NULL,
  `mail_cliente` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`codigo_cliente`, `nombre_cliente`, `giro_cliente`, `region_cliente`, `provincia_cliente`, `comuna_cliente`, `direccion_cliente`, `fono_cliente`, `mail_cliente`) VALUES
('199540513', 'Matias Gaete', 'EMPRENDIMIENTO DE SOFTWARE', 1, 1, 1, 'Los pistachos 2155', '966067120', 'matias.gaetep@sansano.usm.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunas`
--

CREATE TABLE `comunas` (
  `id` int(11) NOT NULL,
  `comuna` varchar(64) NOT NULL,
  `provincia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comunas`
--

INSERT INTO `comunas` (`id`, `comuna`, `provincia_id`) VALUES
(1, 'Arica', 1),
(2, 'Camarones', 1),
(3, 'General Lagos', 2),
(4, 'Putre', 2),
(5, 'Alto Hospicio', 3),
(6, 'Iquique', 3),
(7, 'Camiña', 4),
(8, 'Colchane', 4),
(9, 'Huara', 4),
(10, 'Pica', 4),
(11, 'Pozo Almonte', 4),
(12, 'Tocopilla', 5),
(13, 'María Elena', 5),
(14, 'Calama', 6),
(15, 'Ollague', 6),
(16, 'San Pedro de Atacama', 6),
(17, 'Antofagasta', 7),
(18, 'Mejillones', 7),
(19, 'Sierra Gorda', 7),
(20, 'Taltal', 7),
(21, 'Chañaral', 8),
(22, 'Diego de Almagro', 8),
(23, 'Copiapó', 9),
(24, 'Caldera', 9),
(25, 'Tierra Amarilla', 9),
(26, 'Vallenar', 10),
(27, 'Alto del Carmen', 10),
(28, 'Freirina', 10),
(29, 'Huasco', 10),
(30, 'La Serena', 11),
(31, 'Coquimbo', 11),
(32, 'Andacollo', 11),
(33, 'La Higuera', 11),
(34, 'Paihuano', 11),
(35, 'Vicuña', 11),
(36, 'Ovalle', 12),
(37, 'Combarbalá', 12),
(38, 'Monte Patria', 12),
(39, 'Punitaqui', 12),
(40, 'Río Hurtado', 12),
(41, 'Illapel', 13),
(42, 'Canela', 13),
(43, 'Los Vilos', 13),
(44, 'Salamanca', 13),
(45, 'La Ligua', 14),
(46, 'Cabildo', 14),
(47, 'Zapallar', 14),
(48, 'Papudo', 14),
(49, 'Petorca', 14),
(50, 'Los Andes', 15),
(51, 'San Esteban', 15),
(52, 'Calle Larga', 15),
(53, 'Rinconada', 15),
(54, 'San Felipe', 16),
(55, 'Llaillay', 16),
(56, 'Putaendo', 16),
(57, 'Santa María', 16),
(58, 'Catemu', 16),
(59, 'Panquehue', 16),
(60, 'Quillota', 17),
(61, 'La Cruz', 17),
(62, 'La Calera', 17),
(63, 'Nogales', 17),
(64, 'Hijuelas', 17),
(65, 'Valparaíso', 18),
(66, 'Viña del Mar', 18),
(67, 'Concón', 18),
(68, 'Quintero', 18),
(69, 'Puchuncaví', 18),
(70, 'Casablanca', 18),
(71, 'Juan Fernández', 18),
(72, 'San Antonio', 19),
(73, 'Cartagena', 19),
(74, 'El Tabo', 19),
(75, 'El Quisco', 19),
(76, 'Algarrobo', 19),
(77, 'Santo Domingo', 19),
(78, 'Isla de Pascua', 20),
(79, 'Quilpué', 21),
(80, 'Limache', 21),
(81, 'Olmué', 21),
(82, 'Villa Alemana', 21),
(83, 'Colina', 22),
(84, 'Lampa', 22),
(85, 'Tiltil', 22),
(86, 'Santiago', 23),
(87, 'Vitacura', 23),
(88, 'San Ramón', 23),
(89, 'San Miguel', 23),
(90, 'San Joaquín', 23),
(91, 'Renca', 23),
(92, 'Recoleta', 23),
(93, 'Quinta Normal', 23),
(94, 'Quilicura', 23),
(95, 'Pudahuel', 23),
(96, 'Providencia', 23),
(97, 'Peñalolén', 23),
(98, 'Pedro Aguirre Cerda', 23),
(99, 'Ñuñoa', 23),
(100, 'Maipú', 23),
(101, 'Macul', 23),
(102, 'Lo Prado', 23),
(103, 'Lo Espejo', 23),
(104, 'Lo Barnechea', 23),
(105, 'Las Condes', 23),
(106, 'La Reina', 23),
(107, 'La Pintana', 23),
(108, 'La Granja', 23),
(109, 'La Florida', 23),
(110, 'La Cisterna', 23),
(111, 'Independencia', 23),
(112, 'Huechuraba', 23),
(113, 'Estación Central', 23),
(114, 'El Bosque', 23),
(115, 'Conchalí', 23),
(116, 'Cerro Navia', 23),
(117, 'Cerrillos', 23),
(118, 'Puente Alto', 24),
(119, 'San José de Maipo', 24),
(120, 'Pirque', 24),
(121, 'San Bernardo', 25),
(122, 'Buin', 25),
(123, 'Paine', 25),
(124, 'Calera de Tango', 25),
(125, 'Melipilla', 26),
(126, 'Alhué', 26),
(127, 'Curacaví', 26),
(128, 'María Pinto', 26),
(129, 'San Pedro', 26),
(130, 'Isla de Maipo', 27),
(131, 'El Monte', 27),
(132, 'Padre Hurtado', 27),
(133, 'Peñaflor', 27),
(134, 'Talagante', 27),
(135, 'Codegua', 28),
(136, 'Coínco', 28),
(137, 'Coltauco', 28),
(138, 'Doñihue', 28),
(139, 'Graneros', 28),
(140, 'Las Cabras', 28),
(141, 'Machalí', 28),
(142, 'Malloa', 28),
(143, 'Mostazal', 28),
(144, 'Olivar', 28),
(145, 'Peumo', 28),
(146, 'Pichidegua', 28),
(147, 'Quinta de Tilcoco', 28),
(148, 'Rancagua', 28),
(149, 'Rengo', 28),
(150, 'Requínoa', 28),
(151, 'San Vicente de Tagua Tagua', 28),
(152, 'Chépica', 29),
(153, 'Chimbarongo', 29),
(154, 'Lolol', 29),
(155, 'Nancagua', 29),
(156, 'Palmilla', 29),
(157, 'Peralillo', 29),
(158, 'Placilla', 29),
(159, 'Pumanque', 29),
(160, 'San Fernando', 29),
(161, 'Santa Cruz', 29),
(162, 'La Estrella', 30),
(163, 'Litueche', 30),
(164, 'Marchigüe', 30),
(165, 'Navidad', 30),
(166, 'Paredones', 30),
(167, 'Pichilemu', 30),
(168, 'Curicó', 31),
(169, 'Hualañé', 31),
(170, 'Licantén', 31),
(171, 'Molina', 31),
(172, 'Rauco', 31),
(173, 'Romeral', 31),
(174, 'Sagrada Familia', 31),
(175, 'Teno', 31),
(176, 'Vichuquén', 31),
(177, 'Talca', 32),
(178, 'San Clemente', 32),
(179, 'Pelarco', 32),
(180, 'Pencahue', 32),
(181, 'Maule', 32),
(182, 'San Rafael', 32),
(183, 'Curepto', 33),
(184, 'Constitución', 32),
(185, 'Empedrado', 32),
(186, 'Río Claro', 32),
(187, 'Linares', 33),
(188, 'San Javier', 33),
(189, 'Parral', 33),
(190, 'Villa Alegre', 33),
(191, 'Longaví', 33),
(192, 'Colbún', 33),
(193, 'Retiro', 33),
(194, 'Yerbas Buenas', 33),
(195, 'Cauquenes', 34),
(196, 'Chanco', 34),
(197, 'Pelluhue', 34),
(198, 'Bulnes', 35),
(199, 'Chillán', 35),
(200, 'Chillán Viejo', 35),
(201, 'El Carmen', 35),
(202, 'Pemuco', 35),
(203, 'Pinto', 35),
(204, 'Quillón', 35),
(205, 'San Ignacio', 35),
(206, 'Yungay', 35),
(207, 'Cobquecura', 36),
(208, 'Coelemu', 36),
(209, 'Ninhue', 36),
(210, 'Portezuelo', 36),
(211, 'Quirihue', 36),
(212, 'Ránquil', 36),
(213, 'Treguaco', 36),
(214, 'San Carlos', 37),
(215, 'Coihueco', 37),
(216, 'San Nicolás', 37),
(217, 'Ñiquén', 37),
(218, 'San Fabián', 37),
(219, 'Alto Biobío', 38),
(220, 'Antuco', 38),
(221, 'Cabrero', 38),
(222, 'Laja', 38),
(223, 'Los Ángeles', 38),
(224, 'Mulchén', 38),
(225, 'Nacimiento', 38),
(226, 'Negrete', 38),
(227, 'Quilaco', 38),
(228, 'Quilleco', 38),
(229, 'San Rosendo', 38),
(230, 'Santa Bárbara', 38),
(231, 'Tucapel', 38),
(232, 'Yumbel', 38),
(233, 'Concepción', 39),
(234, 'Coronel', 39),
(235, 'Chiguayante', 39),
(236, 'Florida', 39),
(237, 'Hualpén', 39),
(238, 'Hualqui', 39),
(239, 'Lota', 39),
(240, 'Penco', 39),
(241, 'San Pedro de La Paz', 39),
(242, 'Santa Juana', 39),
(243, 'Talcahuano', 39),
(244, 'Tomé', 39),
(245, 'Arauco', 40),
(246, 'Cañete', 40),
(247, 'Contulmo', 40),
(248, 'Curanilahue', 40),
(249, 'Lebu', 40),
(250, 'Los Álamos', 40),
(251, 'Tirúa', 40),
(252, 'Angol', 41),
(253, 'Collipulli', 41),
(254, 'Curacautín', 41),
(255, 'Ercilla', 41),
(256, 'Lonquimay', 41),
(257, 'Los Sauces', 41),
(258, 'Lumaco', 41),
(259, 'Purén', 41),
(260, 'Renaico', 41),
(261, 'Traiguén', 41),
(262, 'Victoria', 41),
(263, 'Temuco', 42),
(264, 'Carahue', 42),
(265, 'Cholchol', 42),
(266, 'Cunco', 42),
(267, 'Curarrehue', 42),
(268, 'Freire', 42),
(269, 'Galvarino', 42),
(270, 'Gorbea', 42),
(271, 'Lautaro', 42),
(272, 'Loncoche', 42),
(273, 'Melipeuco', 42),
(274, 'Nueva Imperial', 42),
(275, 'Padre Las Casas', 42),
(276, 'Perquenco', 42),
(277, 'Pitrufquén', 42),
(278, 'Pucón', 42),
(279, 'Saavedra', 42),
(280, 'Teodoro Schmidt', 42),
(281, 'Toltén', 42),
(282, 'Vilcún', 42),
(283, 'Villarrica', 42),
(284, 'Valdivia', 43),
(285, 'Corral', 43),
(286, 'Lanco', 43),
(287, 'Los Lagos', 43),
(288, 'Máfil', 43),
(289, 'Mariquina', 43),
(290, 'Paillaco', 43),
(291, 'Panguipulli', 43),
(292, 'La Unión', 44),
(293, 'Futrono', 44),
(294, 'Lago Ranco', 44),
(295, 'Río Bueno', 44),
(297, 'Osorno', 45),
(298, 'Puerto Octay', 45),
(299, 'Purranque', 45),
(300, 'Puyehue', 45),
(301, 'Río Negro', 45),
(302, 'San Juan de la Costa', 45),
(303, 'San Pablo', 45),
(304, 'Calbuco', 46),
(305, 'Cochamó', 46),
(306, 'Fresia', 46),
(307, 'Frutillar', 46),
(308, 'Llanquihue', 46),
(309, 'Los Muermos', 46),
(310, 'Maullín', 46),
(311, 'Puerto Montt', 46),
(312, 'Puerto Varas', 46),
(313, 'Ancud', 47),
(314, 'Castro', 47),
(315, 'Chonchi', 47),
(316, 'Curaco de Vélez', 47),
(317, 'Dalcahue', 47),
(318, 'Puqueldón', 47),
(319, 'Queilén', 47),
(320, 'Quellón', 47),
(321, 'Quemchi', 47),
(322, 'Quinchao', 47),
(323, 'Chaitén', 48),
(324, 'Futaleufú', 48),
(325, 'Hualaihué', 48),
(326, 'Palena', 48),
(327, 'Lago Verde', 49),
(328, 'Coihaique', 49),
(329, 'Aysén', 50),
(330, 'Cisnes', 50),
(331, 'Guaitecas', 50),
(332, 'Río Ibáñez', 51),
(333, 'Chile Chico', 51),
(334, 'Cochrane', 52),
(335, 'O\'Higgins', 52),
(336, 'Tortel', 52),
(337, 'Natales', 53),
(338, 'Torres del Paine', 53),
(339, 'Laguna Blanca', 54),
(340, 'Punta Arenas', 54),
(341, 'Río Verde', 54),
(342, 'San Gregorio', 54),
(343, 'Porvenir', 55),
(344, 'Primavera', 55),
(345, 'Timaukel', 55),
(346, 'Cabo de Hornos', 56),
(347, 'Antártica', 56);

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
('1', '773128493', 'codtest', 10, 1500, 15000),
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
('1234', '773128493', 'dsads', 100, 4000, 400000),
('132312', '12312', '1234', 100, 100, 8766),
('2', '773128493', 'dsads', 100, 3000, 300000),
('3', '773128493', 'dsads', 10, 3000, 30000),
('321123', '132312', '11111', 15, 20, 300),
('321123', '132312', '1234', 10, 20, 250),
('321123', '132312', '4321', 40, 1000, 195000),
('321123', '132312', '438732', 12, 50, 2000),
('323', '1323', '438732', 181, 1000, 10000),
('4', '773128493', 'd', 10, 1000, 10000),
('4', '773128493', 'dsads', 10, 4500, 45000),
('4321', '4321', '11111', 10, 20, 250),
('4321', '4321', '1234', 10, 20, 250),
('4321', '4321', '438732', 10, 50, 2000),
('44444', '444444', '1234', 1000, 20, 25000),
('6', '773128493', 'dsads', 10, 5000, 50000);

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
('0', '199540513', 'd', 1, 'P', 1100, 1100),
('1', '199540513', 'dsads', 125, 'P', 5500, 687500),
('10101010', '1010101', '1234', 20, 'P', 25, 500),
('10101010', '1010101', '32123', 1, 'S', 50000, 50000),
('10101010', '1010101', '438732', 30, 'P', 200, 6000),
('111111111111', '199540513', '12346', 1, 'S', 40000, 40000),
('12222', '199540513', 'd', 1, 'P', 1100, 1100),
('1234', '199540513', '12346', 1, 'S', 40000, 40000),
('12345', '773128493', '12346', 1, 'S', 40000, 40000),
('123456789', '123456789', '12345', 0, '3', 4000, 16000),
('13221312', '21321', '1234', 1412, '', 25, 35200),
('2', '199540513', '32123', 1, 'S', 50000, 50000),
('2', '199540513', 'dsads', 5, 'P', 5500, 27500),
('321123', '199540513', '12346', 1, 'S', 40000, 40000),
('354635', '199540513', '12346', 1, 'S', 40000, 40000),
('431423', '199540513', '12346', 1, 'S', 40000, 40000),
('43543', '199540513', '12346', 1, 'S', 40000, 40000),
('454556', '199540513', '12346', 1, 'S', 40000, 40000),
('45456555', '199540513', '12346', 1, 'S', 40000, 40000),
('45465645', '199540513', '12346', 1, 'S', 40000, 40000),
('54645', '199540513', '12346', 1, 'S', 40000, 40000),
('54645', '199540513', 'd', 1, 'P', 1100, 1100),
('5555554', '199540513', '12346', 1, 'S', 40000, 40000),
('56445', '199540513', '12346', 1, 'S', 40000, 40000),
('632143', '199540513', '12346', 1, 'S', 40000, 40000),
('63415653', '199540513', '12346', 1, 'S', 40000, 40000),
('645645666', '199540513', '12346', 1, 'S', 40000, 40000),
('6465321', '199540513', '12346', 1, 'S', 40000, 40000),
('65426313', '199540513', '12346', 1, 'S', 40000, 40000),
('654632', '199540513', '12346', 1, 'S', 40000, 40000),
('65465', '199540513', '12346', 1, 'S', 40000, 40000),
('6546545163', '199540513', '12346', 1, 'S', 40000, 40000),
('77454', '199540513', '12346', 1, 'S', 40000, 40000),
('775657', '773128493', '12346', 1, 'S', 40000, 40000),
('7756571', '199540513', 'd', 1, 'P', 1100, 1100),
('88888', '88888', '1234', 0, '1', 25, 250),
('88888', '88888', '32123', 0, '1', 50000, 50000),
('88888', '88888', '438732', 0, '5', 200, 10000),
('999999', '999999', '12344', 0, '1', 3000, 30000),
('999999', '999999', '12345', 0, '1', 5600, 100800),
('999999', '999999', '32123', 0, '1', 50000, 50000);

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
('1', '773128493', '2001-01-01', '20:03:32', 0, 0, 0),
('11', '120', '2020-09-08', '21:20:34', 0, 0, 96500),
('113212', '12312', '2020-10-05', '20:16:31', 129100, 24529, 153629),
('12', '132', '2020-09-18', '22:17:55', 0, 0, 12000),
('123', '132', '2020-09-18', '22:15:40', 0, 0, 12000),
('1232', '132', '2020-09-18', '22:16:20', 0, 0, 12000),
('1234', '773128493', '2020-10-19', '13:19:47', 400000, 76000, 476000),
('132312', '12312', '2020-10-06', '20:10:51', 8766, 1666, 10432),
('2', '773128493', '2020-10-17', '15:35:34', 0, 0, 0),
('3', '773128493', '2020-10-18', '16:16:07', 30000, 5700, 35700),
('321123', '132312', '2020-10-08', '14:19:20', 0, 0, 0),
('4', '773128493', '2020-10-18', '16:17:40', 45000, 8550, 53550),
('4', '773128493', '2020-10-18', '17:06:29', 10000, 1900, 11900),
('4321', '4321', '2020-09-08', '16:33:50', 2500, 475, 2975),
('44444', '444444', '2020-09-08', '16:40:43', 25000, 4750, 29750),
('6', '773128493', '2020-10-19', '13:15:18', 50000, 9500, 59500);

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
('0', '199540513', '2020-10-24', '13:41:58', 1100, 209, 1309),
('0', '199540513', '2020-10-26', '16:31:30', 2200, 418, 2618),
('1', '199540513', '2020-10-19', '13:16:33', 687500, 130625, 818125),
('10101010', '1010101', '2020-10-11', '02:23:04', 56500, 10735, 67235),
('111111111111', '199540513', '2020-10-23', '01:33:28', 40000, 7600, 47600),
('12222', '199540513', '2020-10-23', '19:04:24', 1100, 209, 1309),
('1234', '199540513', '2020-10-15', '00:43:00', 40000, 7600, 47600),
('12345', '773128493', '2020-10-23', '00:44:56', 40000, 7600, 47600),
('123456789', '123456789', '2020-10-07', '00:42:51', 16000, 3040, 19040),
('123456789', '123456789', '2020-10-07', '00:43:18', 16000, 3040, 19040),
('13221312', '21321', '2020-10-08', '20:15:25', 35200, 6688, 41888),
('2', '199540513', '2020-10-19', '13:18:56', 77500, 14725, 92225),
('321123', '132312', '2020-10-08', '15:42:47', 22075, 0, 0),
('321123', '199540513', '2020-10-15', '00:51:08', 40000, 7600, 47600),
('354635', '199540513', '2020-10-23', '01:55:40', 40000, 7600, 47600),
('431423', '199540513', '2020-10-23', '01:44:34', 40000, 7600, 47600),
('43543', '199540513', '2020-10-23', '01:38:29', 40000, 7600, 47600),
('454556', '199540513', '2020-10-23', '01:36:02', 40000, 7600, 47600),
('45456555', '199540513', '2020-10-23', '01:16:42', 40000, 7600, 47600),
('45465645', '199540513', '2020-10-23', '01:42:51', 40000, 7600, 47600),
('54645', '199540513', '2020-10-23', '18:58:00', 41100, 7809, 48909),
('5555554', '199540513', '2020-10-23', '00:55:32', 40000, 7600, 47600),
('56445', '199540513', '2020-10-23', '01:56:58', 40000, 7600, 47600),
('632143', '199540513', '2020-10-23', '01:57:48', 40000, 7600, 47600),
('63415653', '199540513', '2020-10-23', '01:58:46', 40000, 7600, 47600),
('645645666', '199540513', '2020-10-23', '01:05:10', 40000, 7600, 47600),
('6465321', '199540513', '2020-10-23', '01:54:55', 40000, 7600, 47600),
('65426313', '199540513', '2020-10-23', '01:07:40', 40000, 7600, 47600),
('654632', '199540513', '2020-10-23', '01:40:50', 40000, 7600, 47600),
('65465', '199540513', '2020-10-23', '00:59:37', 40000, 7600, 47600),
('6546545163', '199540513', '2020-10-23', '01:05:29', 40000, 7600, 47600),
('66666', '666666', '2020-10-07', '02:10:36', 60250, 11448, 71698),
('77454', '199540513', '2020-10-23', '01:15:49', 40000, 7600, 47600),
('775657', '773128493', '2020-10-23', '01:34:20', 40000, 7600, 47600),
('7756571', '199540513', '2020-10-23', '19:06:38', 1100, 209, 1309),
('88888', '88888', '2020-10-07', '02:13:12', 60250, 11448, 71698),
('999999', '999999', '2020-10-13', '02:18:04', 180800, 34352, 215152);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `codigo` smallint(6) NOT NULL,
  `codigo_producto` varchar(15) NOT NULL,
  `fecha` date NOT NULL,
  `precio` mediumint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`codigo`, `codigo_producto`, `fecha`, `precio`) VALUES
(2, 'codtest', '2020-10-14', 1000),
(3, 'codtest', '2020-10-16', 1500),
(4, 'codtest', '2020-10-17', 2000),
(5, 'dsads', '2020-10-16', 0),
(6, 'codtest', '2020-10-16', 1500),
(7, 'dsads', '2020-10-17', 3000),
(8, 'dsads', '2020-10-17', 3000),
(9, 'dsads', '2020-10-17', 4500),
(10, 'd', '2020-10-17', 0),
(11, 'd', '2020-10-17', 1000),
(12, 'dsads', '2020-10-19', 5000),
(13, 'dsads', '2020-10-19', 4000);

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
  `tasaCambio` decimal(10,2) NOT NULL,
  `precioVenta` mediumint(9) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`codigo`, `nombre`, `descripcion`, `categoria`, `stock`, `stockCritico`, `tasaCambio`, `precioVenta`, `activo`) VALUES
('100000', 'dsdsada', 'sadd', 1, 10, 15, '0.00', 25, 0),
('11111', 'TEST', 'dfdsfdfd', 2, 35, 15, '0.00', 25, 1),
('12312334', 'Elevador', 'Elevador de pana para llegar a la cima del mundo', 2, 100, 1, '0.00', 500000, 0),
('1232154', 'Compresor de prueba', 'Compresor de pana para familia de pana', 1, 10, 1, '0.00', 15000, 0),
('1234', 'TEST', 'sadddsadsa', 3, 990, 15, '0.00', 25, 1),
('12344', 'TEST', 'sadddsadsa', 3, 0, 15, '0.00', 3000, 1),
('123441', 'TEST', 'sadddsadsa', 3, 10, 15, '0.00', 25, 1),
('12345', 'Tuerca de piedra', 'Es una pruebanomas asi que no se me ocurre descripción', 1, 29, 30, '0.00', 5600, 1),
('4321', 'Prueba de productos', 'JEJEJE', 1, 50, 0, '0.00', 5000, 1),
('438732', 'Aceite', 'Aceite para freir de pana las sopaipas', 1, -49, 10, '0.00', 200, 1),
('4579843', 'Tractor', 'Pa pitiarse a todos los wones', 2, 5, 1, '0.00', 5000000, 1),
('codtest', 'Nombre de producto', 'Pruebaaa', 1, 10, 5, '0.20', 1800, 1),
('d', 'd', 'd', 2, 6, 10, '10.00', 1100, 1),
('dsads', 'dsadsa', 'dsadas', 1, 100, 10, '10.00', 5500, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `codigo_proveedor` varchar(9) NOT NULL,
  `nombre_proveedor` varchar(30) NOT NULL,
  `giro_proveedor` varchar(50) NOT NULL,
  `region_proveedor` int(11) NOT NULL,
  `provincia_proveedor` int(11) NOT NULL,
  `comuna_proveedor` int(11) NOT NULL,
  `direccion_proveedor` varchar(40) NOT NULL,
  `fono_proveedor` varchar(9) NOT NULL,
  `mail_proveedor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`codigo_proveedor`, `nombre_proveedor`, `giro_proveedor`, `region_proveedor`, `provincia_proveedor`, `comuna_proveedor`, `direccion_proveedor`, `fono_proveedor`, `mail_proveedor`) VALUES
('773128493', 'TECHNICAL SERVICE', 'SERVICIO TÉCNICO AUTOMOTRIZ', 0, 0, 0, 'Los pistachos 2155', '660505005', 'marcelo.gaete@text.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `id` int(11) NOT NULL,
  `provincia` varchar(64) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id`, `provincia`, `region_id`) VALUES
(1, 'Arica', 1),
(2, 'Parinacota', 1),
(3, 'Iquique', 2),
(4, 'El Tamarugal', 2),
(5, 'Tocopilla', 3),
(6, 'El Loa', 3),
(7, 'Antofagasta', 3),
(8, 'Chañaral', 4),
(9, 'Copiapó', 4),
(10, 'Huasco', 4),
(11, 'Elqui', 5),
(12, 'Limarí', 5),
(13, 'Choapa', 5),
(14, 'Petorca', 6),
(15, 'Los Andes', 6),
(16, 'San Felipe de Aconcagua', 6),
(17, 'Quillota', 6),
(18, 'Valparaiso', 6),
(19, 'San Antonio', 6),
(20, 'Isla de Pascua', 6),
(21, 'Marga Marga', 6),
(22, 'Chacabuco', 7),
(23, 'Santiago', 7),
(24, 'Cordillera', 7),
(25, 'Maipo', 7),
(26, 'Melipilla', 7),
(27, 'Talagante', 7),
(28, 'Cachapoal', 8),
(29, 'Colchagua', 8),
(30, 'Cardenal Caro', 8),
(31, 'Curicó', 9),
(32, 'Talca', 9),
(33, 'Linares', 9),
(34, 'Cauquenes', 9),
(35, 'Diguillín', 10),
(36, 'Itata', 10),
(37, 'Punilla', 10),
(38, 'Bio Bío', 11),
(39, 'Concepción', 11),
(40, 'Arauco', 11),
(41, 'Malleco', 12),
(42, 'Cautín', 12),
(43, 'Valdivia', 13),
(44, 'Ranco', 13),
(45, 'Osorno', 14),
(46, 'Llanquihue', 14),
(47, 'Chiloé', 14),
(48, 'Palena', 14),
(49, 'Coyhaique', 15),
(50, 'Aysén', 15),
(51, 'General Carrera', 15),
(52, 'Capitán Prat', 15),
(53, 'Última Esperanza', 16),
(54, 'Magallanes', 16),
(55, 'Tierra del Fuego', 16),
(56, 'Antártica Chilena', 16);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `id` int(11) NOT NULL,
  `region` varchar(64) NOT NULL,
  `abreviatura` varchar(4) NOT NULL,
  `capital` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id`, `region`, `abreviatura`, `capital`) VALUES
(1, 'Arica y Parinacota', 'XV', 'Arica'),
(2, 'Tarapacá', 'I', 'Iquique'),
(3, 'Antofagasta', 'II', 'Antofagasta'),
(4, 'Atacama', 'III', 'Copiapó'),
(5, 'Coquimbo', 'IV', 'La Serena'),
(6, 'Valparaiso', 'V', 'valparaíso'),
(7, 'Metropolitana de Santiago', 'RM', 'Santiago'),
(8, 'Libertador General Bernardo O\'Higgins', 'VI', 'Rancagua'),
(9, 'Maule', 'VII', 'Talca'),
(10, 'Ñuble', 'XVI', 'Chillán'),
(11, 'Biobío', 'VIII', 'Concepción'),
(12, 'La Araucanía', 'IX', 'Temuco'),
(13, 'Los Ríos', 'XIV', 'Valdivia'),
(14, 'Los Lagos', 'X', 'Puerto Montt'),
(15, 'Aysén del General Carlos Ibáñez del Campo', 'XI', 'Coyhaique'),
(16, 'Magallanes y de la Antártica Chilena', 'XII', 'Punta Arenas');

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
-- Indices de la tabla `comunas`
--
ALTER TABLE `comunas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `detalle_factura_compra`
--
ALTER TABLE `detalle_factura_compra`
  ADD PRIMARY KEY (`codigo_factura_compra`,`codigo_proveedor`,`codigo_producto`);

--
-- Indices de la tabla `detalle_factura_venta`
--
ALTER TABLE `detalle_factura_venta`
  ADD PRIMARY KEY (`codigo_factura_venta`,`codigo_cliente`,`codigo_producto`);

--
-- Indices de la tabla `factura_compra`
--
ALTER TABLE `factura_compra`
  ADD PRIMARY KEY (`codigo_factura_compra`,`codigo_proveedor`,`fecha_factura`,`hora_factura`) USING BTREE;

--
-- Indices de la tabla `factura_venta`
--
ALTER TABLE `factura_venta`
  ADD PRIMARY KEY (`codigo_factura_venta`,`codigo_cliente`,`fecha_factura`,`hora_factura`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`codigo`,`codigo_producto`,`fecha`),
  ADD KEY `producto_ibfk_2` (`codigo_producto`);

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
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de la tabla `comunas`
--
ALTER TABLE `comunas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=348;

--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `codigo` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `precio`
--
ALTER TABLE `precio`
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`codigo_producto`) REFERENCES `producto` (`codigo`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
