<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/conexion.php';
require_once '../models/socios.models.php';

$socio = new Socio($conexion);

$metodo = $_SERVER['REQUEST_METHOD'];

switch($metodo) {
    case 'GET':
        echo json_encode($socio->obtenerSocios());
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(isset($data->nombre) && isset($data->cedula)) {
            $telefono = isset($data->telefono) ? $data->telefono : '';
            $email = isset($data->email) ? $data->email : '';

            $respuesta = $socio->registrarSocio($data->nombre, $data->cedula, $telefono, $email);
            
            if ($respuesta === true) {
                echo json_encode(["mensaje" => "Socio registrado con exito"]);
            } else {
                echo json_encode(["mensaje" => "Error: " . $respuesta]);
            }
        } else {
            echo json_encode(["mensaje" => "Faltan datos obligatorios"]);
        }
        break;
}
$conexion->close();