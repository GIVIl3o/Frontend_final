use frontend_final;

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


insert into music(`name`,src,band_id, album_id) values 
("Runaway", "../other/music/runaway.mp3", 1, 1),
("Crawling", "../other/music/crawling.mp3", 1, 1),
("PaperCut", "../other/music/PaperCut.mp3", 1, 1),
("Only God Can Judge Me", "../other/music/2pac-changes.mp3", 2, 2),
("All Eyez on Me","../other/music/2pac-changes.mp3", 2, 2),
("Life Goes On","../other/music/2pac-changes.mp3", 2, 2),
("If I Die 2Nite","../other/music/2pac-changes.mp3", 2, 3),
("Me Against the World","../other/music/2pac-changes.mp3", 2, 3),
("So Many Tears","../other/music/2pac-changes.mp3", 2, 3),
("Dear Mama","../other/music/2pac-changes.mp3", 2, 3),
("Hit'Em Up","../other/music/2pac-changes.mp3", 2, 3),
("Changes","../other/music/2pac-changes.mp3", 2, 3),
("California Love","../other/music/2pac-changes.mp3", 2, 3),
("Mockingbird","../other/music/EminemMockingbird.mp3", 3, 4),
("Lose Yourself","../other/music/EminemMockingbird.mp3", 3, 4),
("Not Afraid","../other/music/EminemMockingbird.mp3", 3, 4),
("No Love","../other/music/EminemMockingbird.mp3", 3, 4),
("When I'm Gone","../other/music/EminemMockingbird.mp3", 3, 4),
("You & Me","../other/music/notoriousBig.mp3", 4, 5),
("I Wanna Go To Hell","../other/music/notoriousBig.mp3", 4, 5),
("Big Poppa","../other/music/notoriousBig.mp3", 4, 5),
("Who Shot Ya","../other/music/notoriousBig.mp3", 4, 5);
