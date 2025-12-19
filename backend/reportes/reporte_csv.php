<?php
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=Reporte_Membresias_Activas.csv');

require_once('../config/conexion.php');
require_once('../models/pago.models.php');

$output = fopen('php://output', 'w');
fputcsv($output, array('Socio', 'Membresia', 'Vence', 'Monto'));

$Pago = new Pago($conexion);
$datos = $Pago->reporteActivas();

while ($row = $datos->fetch_assoc()) {
    fputcsv($output, array(
        utf8_decode($row['socio_nombre']),
        utf8_decode($row['membresia_nombre']),
        $row['fecha_fin'],
        $row['monto']
    ));
}
fclose($output);