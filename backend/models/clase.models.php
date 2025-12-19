<?php
class Clase {
    private $conexion;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    public function obtenerClases() {
        $sql = "SELECT * FROM clases ORDER BY id ASC";
        $resultado = $this->conexion->query($sql);
        $clases = [];
        while ($fila = $resultado->fetch_assoc()) {
            $clases[] = $fila;
        }
        return $clases;
    }

    public function uno($id) {
        $sql = "SELECT * FROM clases WHERE id = $id";
        $resultado = $this->conexion->query($sql);
        return $resultado->fetch_assoc();
    }

    public function registrarClase($nombre, $instructor, $horario) {
        $sql = "INSERT INTO clases (nombre, instructor, horario) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sss", $nombre, $instructor, $horario);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function actualizarClase($id, $nombre, $instructor, $horario) {
        $sql = "UPDATE clases SET nombre=?, instructor=?, horario=? WHERE id=?";
        $stmt = $this->conexion->prepare($sql);
        $stmt->bind_param("sssi", $nombre, $instructor, $horario, $id);
        $res = $stmt->execute() ? true : $this->conexion->error;
        $stmt->close();
        return $res;
    }

    public function eliminarClase($id) {
        $sql = "DELETE FROM clases WHERE id = $id";
        return $this->conexion->query($sql) ? true : $this->conexion->error;
    }
}