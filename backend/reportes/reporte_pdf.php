<?php
require('fpdf/fpdf.php');
require_once('../config/conexion.php');
require_once('../models/pago.models.php');

class PDF extends FPDF
{
    function Header()
    {
        $this->SetFont('Arial', 'B', 16);
        $this->Cell(0, 10, utf8_decode('Reporte de Membresías Activas'), 0, 1, 'C');
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 5, 'Gimnasio KVM', 0, 1, 'C');
        $this->Ln(10);

        $this->SetFillColor(0, 128, 128);
        $this->SetTextColor(255);
        $this->SetFont('Arial', 'B', 11);
        
        $this->Cell(60, 10, 'Socio', 1, 0, 'C', true);
        $this->Cell(50, 10, utf8_decode('Membresía'), 1, 0, 'C', true);
        $this->Cell(40, 10, 'Vence', 1, 0, 'C', true);
        $this->Cell(40, 10, 'Monto ($)', 1, 1, 'C', true);
    }

    function Footer()
    {
        $this->SetY(-15);
        $this->SetFont('Arial', 'I', 8);
        $this->Cell(0, 10, utf8_decode('Página ') . $this->PageNo() . '/{nb}', 0, 0, 'C');
    }
}

$Pago = new Pago($conexion);
$datos = $Pago->reporteActivas();
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial', '', 11);
$pdf->SetTextColor(0);

if ($datos) {
    while ($row = $datos->fetch_assoc()) {
        $pdf->Cell(60, 10, utf8_decode($row['socio_nombre']), 1);
        $pdf->Cell(50, 10, utf8_decode($row['membresia_nombre']), 1);
        $pdf->Cell(40, 10, $row['fecha_fin'], 1, 0, 'C');
        $pdf->Cell(40, 10, '$ ' . number_format($row['monto'], 2), 1, 1, 'R');
    }
}

$accion = isset($_GET['accion']) && $_GET['accion'] == 'descargar' ? 'D' : 'I';
$pdf->Output($accion, 'Reporte_Membresias_Activas.pdf');