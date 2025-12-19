<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/conexion.php';
require_once '../models/socios.models.php';

$socio = new Socio($conexion);
$op = isset($_GET["op"]) ? $_GET["op"] : '';

switch ($op) {
    case 'todos':
        echo json_encode($socio->obtenerSocios());
        break;

    case 'uno':
        $id = isset($_POST["id"]) ? $_POST["id"] : (json_decode(file_get_contents("php://input"))->id ?? 0);
        echo json_encode($socio->uno($id));
        break;

    case 'insertar':
        $data = json_decode(file_get_contents("php://input"));
        if ($data) {
            $res = $socio->registrarSocio($data->nombre, $data->cedula, $data->telefono, $data->email);
            ob_clean();
            echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Socio registrado"] : ["status" => "error", "mensaje" => $res]);
        }
        break;

    case 'actualizar':
        $data = json_decode(file_get_contents("php://input"));
        if ($data) {
            $res = $socio->actualizarSocio($data->id, $data->nombre, $data->cedula, $data->telefono, $data->email);
            ob_clean();
            echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Socio actualizado"] : ["status" => "error", "mensaje" => $res]);
        }
        break;

    case 'eliminar':
        $id = isset($_POST["id"]) ? $_POST["id"] : (json_decode(file_get_contents("php://input"))->id ?? 0);
        $res = $socio->eliminarSocio($id);
        ob_clean();
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Socio eliminado"] : ["status" => "error", "mensaje" => $res]);
        break;
}
$conexion->close();