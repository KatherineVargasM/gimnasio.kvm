<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/conexion.php';
require_once '../models/clase.models.php';

$clase = new Clase($conexion);
$op = isset($_GET["op"]) ? $_GET["op"] : '';

switch ($op) {
    case 'todos':
        echo json_encode($clase->obtenerClases());
        break;
    case 'uno':
        $id = $_POST["id"];
        echo json_encode($clase->uno($id));
        break;
    case 'insertar':
        $data = json_decode(file_get_contents("php://input"));
        $res = $clase->registrarClase($data->nombre, $data->instructor, $data->horario);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Clase registrada"] : ["status" => "error", "mensaje" => $res]);
        break;
    case 'actualizar':
        $data = json_decode(file_get_contents("php://input"));
        $res = $clase->actualizarClase($data->id, $data->nombre, $data->instructor, $data->horario);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Clase actualizada"] : ["status" => "error", "mensaje" => $res]);
        break;
    case 'eliminar':
        $id = $_POST["id"];
        $res = $clase->eliminarClase($id);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Clase eliminada"] : ["status" => "error", "mensaje" => $res]);
        break;
}
$conexion->close();