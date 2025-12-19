<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST,DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../config/conexion.php';
require_once '../models/pago.models.php';

$pago = new Pago($conexion);
$metodo = $_SERVER['REQUEST_METHOD'];

switch($metodo) {
    case 'GET':
        $datos = $pago->obtenerPagos();
        ob_clean();
        echo json_encode($datos);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if(isset($data->socio_id) && isset($data->monto)) {
            $respuesta = $pago->registrarPago($data->socio_id, $data->membresia_id, $data->monto, $data->fecha_pago, $data->fecha_inicio, $data->fecha_fin);
            ob_clean();
            echo json_encode(["mensaje" => $respuesta === true ? "Exito" : "Error"]);
        }
        break;

    case 'DELETE':
        if(isset($_GET['id'])) {
            $respuesta = $pago->eliminarPago($_GET['id']);
            ob_clean();
            echo json_encode(["mensaje" => $respuesta ? "Eliminado" : "Error"]);
        }
        break;
}
$conexion->close();