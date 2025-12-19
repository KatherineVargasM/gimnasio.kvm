<?php
$servidor = "localhost";
$usuario = "root";
$clave = "";
$base_datos = "gimnasio";

$conexion = new mysqli($servidor, $usuario, $clave, $base_datos);

if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexion: " . $conexion->connect_error]));
}