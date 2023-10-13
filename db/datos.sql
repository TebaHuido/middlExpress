CREATE DATABASE IF NOT EXISTS proyecto_3;
show databases;
use proyecto_3;

CREATE TABLE persona
(
  persona_id INT NOT NULL,
  nombre_completo VARCHAR(60) NOT NULL,
  rut VARCHAR(11) NOT NULL,
  correo VARCHAR(30) NOT NULL,
  genero VARCHAR(10) NOT NULL,
  Numero_celular INT NOT NULL,
  contraseña VARCHAR(20) NOT NULL,
  PRIMARY KEY (persona_id),
  UNIQUE (rut),
  UNIQUE (correo)
);
insert into persona values 
  (1, 'Angelo Alexander Coriza Medina', '19869642-0', 'angelo@gmail.com','Masculino', 56972244206, 'contraseña')

  CREATE TABLE persona
(
  persona_id INT NOT NULL auto_increment,
  nombre_completo VARCHAR(60) NOT NULL,
  correo VARCHAR(60) NOT NULL,
  genero VARCHAR(10) NOT NULL,
  contraseña VARCHAR(60) NOT NULL,
  PRIMARY KEY (persona_id),
  UNIQUE (correo)
);
insert into persona(nombre_completo,correo,genero,contraseña) values(?,?,?,?)
insert into Egresados(anio_titulo,persona_id) values(?,?)

CREATE TABLE administrador
(
  persona_id INT NOT NULL,
  PRIMARY KEY (persona_id),
  FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
);

CREATE TABLE Egresados
(
  anio_titulo INT NOT NULL,
  persona_id INT NOT NULL,
  PRIMARY KEY (persona_id),
  FOREIGN KEY (persona_id) REFERENCES persona(persona_id)
);
CREATE TABLE carrera
(
  nombre INT NOT NULL,
  cod INT NOT NULL,
  PRIMARY KEY (cod)
);