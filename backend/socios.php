<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'conexion.php';

$metodo = $_SERVER['REQUEST_METHOD'];

switch($metodo) {
    case 'GET':
        $sql = "SELECT * FROM socios";
        $resultado = $conexion->query($sql);
        
        $socios = [];
        if ($resultado->num_rows > 0) {
            while($fila = $resultado->fetch_assoc()) {
                $socios[] = $fila;
            }
        }
        echo json_encode($socios);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        
        if(isset($data->nombre) && isset($data->cedula)) {
            $nombre = $data->nombre;
            $cedula = $data->cedula;
            $telefono = $data->telefono;
            $email = $data->email;

            $sql = "INSERT INTO socios (nombre, cedula, telefono, email) VALUES ('$nombre', '$cedula', '$telefono', '$email')";
            
            if ($conexion->query($sql) === TRUE) {
                echo json_encode(["mensaje" => "Socio registrado con exito"]);
            } else {
                echo json_encode(["mensaje" => "Error: " . $conexion->error]);
            }
        } else {
            echo json_encode(["mensaje" => "Faltan datos"]);
        }
        break;
}

$conexion->close();
?>