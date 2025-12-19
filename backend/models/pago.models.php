<?php
class Pago {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerPagos() {
        $sql = "SELECT p.*, s.nombre as socio_nombre, m.nombre as membresia_nombre 
                FROM pagos p 
                LEFT JOIN socios s ON p.socio_id = s.id
                LEFT JOIN membresias m ON p.membresia_id = m.id
                ORDER BY p.id ASC";
        $resultado = $this->conexion->query($sql);
        $pagos = [];
        while ($fila = $resultado->fetch_assoc()) {
            $pagos[] = $fila;
        }
        return $pagos;
    }

    public function reporteActivas() {
        $sql = "SELECT p.*, s.nombre as socio_nombre, m.nombre as membresia_nombre 
                FROM pagos p 
                INNER JOIN socios s ON p.socio_id = s.id
                INNER JOIN membresias m ON p.membresia_id = m.id
                WHERE p.fecha_fin >= CURDATE()
                ORDER BY p.fecha_fin ASC";
        return $this->conexion->query($sql);
    }

    public function registrarPago($socio_id, $membresia_id, $monto, $fecha_pago, $fecha_inicio, $fecha_fin) {
        $sql = "INSERT INTO pagos (socio_id, membresia_id, monto, fecha_pago, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("iidsss", $socio_id, $membresia_id, $monto, $fecha_pago, $fecha_inicio, $fecha_fin);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function eliminarPago($id) {
        $sql = "DELETE FROM pagos WHERE id = $id";
        return $this->conexion->query($sql) ? true : $this->conexion->error;
    }
}