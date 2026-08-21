drop database if exists Kiosco;
create database Kiosco;
use kiosco;

create table golosinas(
    id int primary key auto_increment,
    nombre varchar(50) not null,
    marca varchar(50) not null

);

insert into golosinas (nombre,marca) values ("Alfajor","Fantoche");
insert into golosinas (nombre,marca) values ("Galletitas","Arcor");
insert into golosinas (nombre,marca) values ("Galletitas","Bagley");
insert into golosinas (nombre,marca) values ("Galletitas","Carrefour");
insert into golosinas (nombre,marca) values ("Galletitas","Dia");
insert into golosinas (nombre,marca) values ("Galletitas","Oreo");

delete from golosinas where id = 3;

update golosinas set nombre = "Papas Fritas", marca="Lays" where id = 2;
        /* tabla      columna   contenido     columna2 contenido  y posicion 2     */