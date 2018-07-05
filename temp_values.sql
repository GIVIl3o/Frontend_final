
use frontend_final;

DELETE FROM music where id!=-1;

insert into bands(band_name,band_cover) values 
("Linkin Park","../other/covers/linkin_park.jpg");


insert into music(`name`,src,band_id) values 
("Runaway","../other/music/runaway.mp3",1),
("Crawling","../other/music/crawling.mp3",1),
("PaperCut","../other/music/PaperCut.mp3",1);

