<?php
class Membresia {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerMembresias() {
        $sql = "SELECT * FROM membresias";
        $resultado = $this->conexion->query($sql);
        
        $membresias = [];
        if ($resultado && $resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                $membresias[] = $fila;
            }
        }
        return $membresias;
    }

    public function registrarMembresia($nombre, $duracion_dias, $precio) {
        $sql = "INSERT INTO membresias (nombre, duracion_dias, precio) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sid", $nombre, $duracion_dias, $precio);
        
        if ($stmt->execute()) {
            $resultado = true;
        } else {
            $resultado = $this->conexion->error;
        }
        $stmt->close();
        
        return $resultado;
    }
}