use frontend_final;

insert into users(username,password) values
("admin","c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec");

insert into albums(album_name, album_cover) values 
("Linkin Park Album", "../other/covers/linkin_park.jpg"),
("All Eyez on Me", "../other/covers/Alleyezonme.jpg"),
("Me Against The World", "../other/covers/Meagainsttheworldcover.jpg"),
("Eminem Album", "../other/covers/eminemAlbum.jpg"),
("B.I.G Album", "../other/covers/notoiousAlbum.jpg");


insert into bands(band_name,band_cover) values 
("Linkin Park","../other/covers/linkin_park.jpg"),
("2Pac","../other/covers/2pac.jpeg"),
("Eminem", "../other/covers/eminem.jpg"),
("Notorious B.I.G", "../other/covers/notoious.jpg");


insert into music(`name`,src,band_id, album_id,author) values 
("Runaway", "../other/music/runaway.mp3", 1, 1,"admin"),
("Crawling", "../other/music/crawling.mp3", 1, 1,"admin"),
("PaperCut", "../other/music/PaperCut.mp3", 1, 1,"admin"),
("Only God Can Judge Me", "../other/music/2pac-changes.mp3", 2, 2,"admin"),
("All Eyez on Me","../other/music/2pac-changes.mp3", 2, 2,"admin"),
("Life Goes On","../other/music/2pac-changes.mp3", 2, 2,"admin"),
("If I Die 2Nite","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("Me Against the World","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("So Many Tears","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("Dear Mama","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("Hit'Em Up","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("Changes","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("California Love","../other/music/2pac-changes.mp3", 2, 3,"admin"),
("Mockingbird","../other/music/EminemMockingbird.mp3", 3, 4,"admin"),
("Lose Yourself","../other/music/EminemMockingbird.mp3", 3, 4,"admin"),
("Not Afraid","../other/music/EminemMockingbird.mp3", 3, 4,"admin"),
("No Love","../other/music/EminemMockingbird.mp3", 3, 4,"admin"),
("When I'm Gone","../other/music/EminemMockingbird.mp3", 3, 4,"admin"),
("You & Me","../other/music/notoriousBig.mp3", 4, 5,"admin"),
("I Wanna Go To Hell","../other/music/notoriousBig.mp3", 4, 5,"admin"),
("Big Poppa","../other/music/notoriousBig.mp3", 4, 5,"admin"),
("Who Shot Ya","../other/music/notoriousBig.mp3", 4, 5,"admin");
