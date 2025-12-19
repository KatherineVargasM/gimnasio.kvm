<?php
class Socio {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerSocios() {
        $sql = "SELECT * FROM socios";
        $resultado = $this->conexion->query($sql);
        
        $socios = [];
        if ($resultado && $resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                $socios[] = $fila;
            }
        }
        return $socios;
    }

    public function registrarSocio($nombre, $cedula, $telefono, $email) {
        $sql = "INSERT INTO socios (nombre, cedula, telefono, email) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssss", $nombre, $cedula, $telefono, $email);
        
        if ($stmt->execute()) {
            $resultado = true;
        } else {
            $resultado = $this->conexion->error;
        }
        $stmt->close();
        
        return $resultado;
    }
}