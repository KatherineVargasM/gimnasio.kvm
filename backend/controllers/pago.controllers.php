<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

require_once '../config/conexion.php';
require_once '../models/pago.models.php';

$pago = new Pago($conexion);
$op = isset($_GET["op"]) ? $_GET["op"] : '';

switch ($op) {
    case 'todos':
        echo json_encode($pago->obtenerPagos());
        break;
    case 'reporte_activas':
        $res = $pago->reporteActivas();
        $datos = [];
        while($f = $res->fetch_assoc()){ $datos[] = $f; }
        echo json_encode($datos);
        break;
    case 'insertar':
        $data = json_decode(file_get_contents("php://input"));
        $res = $pago->registrarPago($data->socio_id, $data->membresia_id, $data->monto, $data->fecha_pago, $data->fecha_inicio, $data->fecha_fin);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Exito"] : ["status" => "error", "mensaje" => $res]);
        break;
    case 'eliminar':
        $id = $_POST["id"];
        $res = $pago->eliminarPago($id);
        echo json_encode($res === true ? ["status" => "ok", "mensaje" => "Eliminado"] : ["status" => "error", "mensaje" => $res]);
        break;
}
$conexion->close();