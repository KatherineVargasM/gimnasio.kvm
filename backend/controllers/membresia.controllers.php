<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/conexion.php';
require_once '../models/membresia.models.php';

$membresia = new Membresia($conexion);

$metodo = $_SERVER['REQUEST_METHOD'];

switch($metodo) {
    case 'GET':
        $datos = $membresia->obtenerMembresias();
        ob_clean();
        echo json_encode($datos);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(isset($data->nombre) && isset($data->duracion_dias) && isset($data->precio)) {
            $respuesta = $membresia->registrarMembresia($data->nombre, $data->duracion_dias, $data->precio);
            
            ob_clean();
            if ($respuesta === true) {
                echo json_encode(["mensaje" => "Membresía registrada con éxito"]);
            } else {
                echo json_encode(["mensaje" => "Error: " . $respuesta]);
            }
        } else {
            ob_clean();
            echo json_encode(["mensaje" => "Faltan datos obligatorios"]);
        }
        break;
}
$conexion->close();