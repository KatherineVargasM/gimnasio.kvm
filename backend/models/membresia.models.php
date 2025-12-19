<?php
class Membresia {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerMembresias() {
        $sql = "SELECT * FROM membresias ORDER BY id ASC";
        $resultado = $this->conexion->query($sql);
        $membresias = [];
        while ($fila = $resultado->fetch_assoc()) {
            $membresias[] = $fila;
        }
        return $membresias;
    }

    public function uno($id) {
        $sql = "SELECT * FROM membresias WHERE id = $id";
        $resultado = $this->conexion->query($sql);
        return $resultado->fetch_assoc();
    }

    public function registrarMembresia($nombre, $precio, $duracion_dias) {
        $sql = "INSERT INTO membresias (nombre, precio, duracion_dias) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sdi", $nombre, $precio, $duracion_dias);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function actualizarMembresia($id, $nombre, $precio, $duracion_dias) {
        $sql = "UPDATE membresias SET nombre=?, precio=?, duracion_dias=? WHERE id=?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sdii", $nombre, $precio, $duracion_dias, $id);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function eliminarMembresia($id) {
        $sql = "DELETE FROM membresias WHERE id = $id";
        return $this->conexion->query($sql) ? true : $this->conexion->error;
    }
}