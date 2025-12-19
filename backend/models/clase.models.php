<?php
require_once '../config/conexion.php';

class Clase {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerClases() {
        $sql = "SELECT * FROM clases";
        $resultado = $this->conexion->query($sql);
        
        $clases = [];
        if ($resultado && $resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                $clases[] = $fila;
            }
        }
        return $clases;
    }

    public function registrarClase($nombre, $horario, $instructor) {
        $sql = "INSERT INTO clases (nombre, horario, instructor) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sss", $nombre, $horario, $instructor);
        
        if ($stmt->execute()) {
            $resultado = true;
        } else {
            $resultado = $this->conexion->error;
        }
        $stmt->close();
        
        return $resultado;
    }
}