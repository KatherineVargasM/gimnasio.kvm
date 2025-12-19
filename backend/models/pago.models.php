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
                LEFT JOIN membresias m ON p.membresia_id = m.id";
        $resultado = $this->conexion->query($sql);
        
        $pagos = [];
        if ($resultado && $resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                $pagos[] = $fila;
            }
        }
        return $pagos;
    }

    public function registrarPago($socio_id, $membresia_id, $monto, $fecha_pago, $fecha_inicio, $fecha_fin) {
        $sql = "INSERT INTO pagos (socio_id, membresia_id, monto, fecha_pago, fecha_inicio, fecha_fin) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("iidsss", $socio_id, $membresia_id, $monto, $fecha_pago, $fecha_inicio, $fecha_fin);
        
        if ($stmt->execute()) {
            $resultado = true;
        } else {
            $resultado = $this->conexion->error;
        }
        $stmt->close();
        
        return $resultado;
    }

    public function eliminarPago($id) {
        $sql = "DELETE FROM pagos WHERE id = ?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("i", $id);
        $resultado = $stmt->execute();
        $stmt->close();
        return $resultado;
    }
}