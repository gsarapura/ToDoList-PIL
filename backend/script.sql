-- EJEMPLO
create database todolist;
use disquería;

create table usuarios (
    id_usuario int not null auto_increment primary key,
    user_name varchar(30) not null,
    contraseña varchar(30) not null,
    email varchar(30) not null,
    nombre varchar(30) not null,
    apellido varchar(30) not null,
);

create table notas (
    id_nota int not null auto_increment primary key,
    nombre varchar(30) not null,
    completado boolean not null,
    foreign key(id_usuario) references usuarios(id_usuario),
);