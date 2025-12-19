<?php
header("Content-Type: application/vnd.ms-excel; charset=utf-8");
header("Content-Disposition: attachment; filename=Reporte_Membresias_Activas.xls");
header("Pragma: no-cache");
header("Expires: 0");

require_once('../config/conexion.php');
require_once('../models/pago.models.php');

$Pago = new Pago($conexion);
$datos = $Pago->reporteActivas();

echo "<table border='1'>";
echo "<tr><th colspan='4' style='background-color: #008080; color: white;'>REPORTE DE MEMBRESIAS ACTIVAS - GIMNASIO KVM</th></tr>";
echo "<tr>
        <th style='background-color: #cccccc;'>Socio</th>
        <th style='background-color: #cccccc;'>Membresia</th>
        <th style='background-color: #cccccc;'>Vence</th>
        <th style='background-color: #cccccc;'>Monto</th>
      </tr>";

while ($row = $datos->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . utf8_decode($row['socio_nombre']) . "</td>";
    echo "<td>" . utf8_decode($row['membresia_nombre']) . "</td>";
    echo "<td>" . $row['fecha_fin'] . "</td>";
    echo "<td>" . number_format($row['monto'], 2) . "</td>";
    echo "</tr>";
}
echo "</table>";