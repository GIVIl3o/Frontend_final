

var all_music = [
	{	
		music_id: 0,
		name: "Crawling",
		src: "../other/music/crawling.mp3",
		band_id: 0, 
	},
	{	
		music_id: 1,
		name: "Runaway",
		src: "../other/music/runaway.mp3",
		band_id: 0,
	},
	{	
		music_id: 2,
		name: "PaperCut",
		src: "../other/music/PaperCut.mp3",
		band_id: 0,
	},
];

function get_all_music(){
	return all_music;
}

function get_music_count(){
	return all_music.length;
}

function get_ith_music(i){
	return all_music[i];
}