CREATE DATABASE proyectojava_24112;
USE proyectojava_24112;

CREATE TABLE RegistroUsuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
    apellido VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    fechaNacimiento DATE
);

CREATE TABLE login (
	id INT auto_increment PRIMARY KEY,
    email VARCHAR(255),
    contrasena VARCHAR(50)
);

SELECT * FROM registroUsuarios;
SELECT * FROM login;

INSERT INTO login (email,contrasena) VALUES ("admin@prueba.com","admin");
DELETE FROM login WHERE id = 2;
INSERT INTO registroUsuarios (nombre, apellido, email, password, fechaNacimiento)
VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'pass1', '1985-05-15'),
('María', 'Gómez', 'maria.gomez@example.com', 'pass2', '1990-08-20'),
('Carlos', 'Silva', 'carlos.silva@example.com', 'pass3', '1982-12-01'),
('Ana', 'Fernández', 'ana.fernandez@example.com', 'pass4', '1995-07-07'),
('Luis', 'Martínez', 'luis.martinez@example.com', 'pass5', '1978-03-30');
