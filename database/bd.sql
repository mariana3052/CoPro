-- Base de datos
CREATE DATABASE Copro;

USE Copro;

CREATE TABLE Usuarios(
    Id int PRIMARY KEY AUTO_INCREMENT,
    Nombre varchar(100),
    Usuario varchar(50),
    Contrasena varchar(200)
);

CREATE TABLE Preguntas(
    Id int PRIMARY KEY AUTO_INCREMENT,
    Titulo varchar(100),
    Descripcion varchar(800),
    Categoria enum('MySQL', 'SQL Server', 'C#', 'C++', 'Java Script', 'NodeJS'),
    fkUsuario int,
    Imagen varchar(100),
    CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuarios(Id)
);

CREATE TABLE Respuestas(
    Id int PRIMARY KEY AUTO_INCREMENT,
    Respuesta varchar(800),
    fkPregunta int,
    fkUsuario int,
    Imagen varchar(100),
    CONSTRAINT fkPregunta FOREIGN KEY (fkPregunta) REFERENCES Preguntas(Id),
    CONSTRAINT fkUsu FOREIGN KEY (fkUsuario) REFERENCES Usuarios(Id)
);