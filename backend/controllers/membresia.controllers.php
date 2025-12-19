<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/conexion.php';
require_once '../models/membresia.models.php';

$membresia = new Membresia($conexion);
$op = isset($_GET["op"]) ? $_GET["op"] : '';

switch ($op) {
    case 'todos':
        echo json_encode($membresia->obtenerMembresias());
        break;
    case 'uno':
        $id = $_POST["id"];
        echo json_encode($membresia->uno($id));
        break;
    case 'insertar':
        $data = json_decode(file_get_contents("php://input"));
        $res = $membresia->registrarMembresia($data->nombre, $data->precio, $data->duracion_dias);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Membresia registrada"] : ["status" => "error", "mensaje" => $res]);
        break;
    case 'actualizar':
        $data = json_decode(file_get_contents("php://input"));
        $res = $membresia->actualizarMembresia($data->id, $data->nombre, $data->precio, $data->duracion_dias);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Membresia actualizada"] : ["status" => "error", "mensaje" => $res]);
        break;
    case 'eliminar':
        $id = $_POST["id"];
        $res = $membresia->eliminarMembresia($id);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Membresia eliminada"] : ["status" => "error", "mensaje" => $res]);
        break;
}
$conexion->close();