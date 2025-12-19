<?php
class Socio {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerSocios() {
        $sql = "SELECT * FROM socios ORDER BY id ASC";
        $resultado = $this->conexion->query($sql);
        $socios = [];
        while ($fila = $resultado->fetch_assoc()) {
            $socios[] = $fila;
        }
        return $socios;
    }

    public function uno($id) {
        $sql = "SELECT * FROM socios WHERE id = $id";
        $resultado = $this->conexion->query($sql);
        return $resultado->fetch_assoc();
    }

    public function registrarSocio($nombre, $cedula, $telefono, $email) {
        $sql = "INSERT INTO socios (nombre, cedula, telefono, email) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssss", $nombre, $cedula, $telefono, $email);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function actualizarSocio($id, $nombre, $cedula, $telefono, $email) {
        $sql = "UPDATE socios SET nombre=?, cedula=?, telefono=?, email=? WHERE id=?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("ssssi", $nombre, $cedula, $telefono, $email, $id);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function eliminarSocio($id) {
        $sql = "DELETE FROM socios WHERE id = $id";
        return $this->conexion->query($sql) ? true : $this->conexion->error;
    }
}