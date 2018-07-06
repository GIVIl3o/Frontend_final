CREATE DATABASE IF NOT EXISTS frontend_final;

use frontend_final;


CREATE TABLE IF NOT EXISTS bands (
    id int auto_increment,
    band_name varchar(100),
    band_cover varchar(500),
    primary key(id)
);

CREATE TABLE IF NOT EXISTS albums (
    id int auto_increment,
    album_name varchar(100),
    album_cover varchar(500),
    primary key(id)
);

CREATE TABLE IF NOT EXISTS music (
    id int auto_increment,
    `name` varchar(100),
    src varchar(500),
    band_id int,
    album_id int,
    primary key(id),
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (band_id) REFERENCES bands(id)
);

CREATE TABLE IF NOT EXISTS users(
    username varchar(100),
    `password` varchar(500),
    primary key(username)
);

create table if not exists playlists(
	id int auto_increment,
    `name` varchar (100),
    username varchar(100),
	primary key(id),
    FOREIGN KEY (username) REFERENCES users(username)
);

create table if not exists playlists_song_id(
	playlist_id int,
    song_id int,
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
	FOREIGN KEY (song_id) REFERENCES music(id)
);


