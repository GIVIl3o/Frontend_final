CREATE DATABASE IF NOT EXISTS frontend_final;

use frontend_final;


CREATE TABLE IF NOT EXISTS bands (
    id int auto_increment,
    band_name varchar(100),
    band_cover varchar(500),
    primary key(id)
);

CREATE TABLE IF NOT EXISTS music (
    id int auto_increment,
    `name` varchar(100),
    src varchar(500),
    band_id int,
    primary key(id),
    FOREIGN KEY (band_id) REFERENCES bands(id)
);

CREATE TABLE IF NOT EXISTS users(
    username varchar(100),
    `password` varchar(500),
    primary key(username)
);

