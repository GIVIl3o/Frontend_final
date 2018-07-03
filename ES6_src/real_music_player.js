

var audio=null;

function create_new_audio(src,change_max_time){
	audio=new Audio(src);
	audio.addEventListener("timeupdate",function(){
		document.getElementById("current_playing_music_time").value=audio.currentTime;
	});

	if(change_max_time==1)
		audio.addEventListener("loadeddata", function() {
			document.getElementById("current_playing_music_time").setAttribute("max",audio.duration);
		});
}

function get_player(song){
	if(audio!=null)audio.pause();

	create_new_audio(song["src"],0);

	var band=get_band_info(song["band_id"]);

	var html="";
	html+="<input type='range' min='0' max='0' id='current_playing_music_time' value='0'>";
	html+="<div class='music_player' >";
	html+="<div class='player_centered'>";
	html+="<button id='play_current_song' >play</button>";
	html+="<img src="+band["cover"]+" width='60' height='40' id='now_playing_cover_photo'>";
	html+="<h3 id='now_playing_name'>"+band["name"]+":"+song["name"]+"</h3>";
	html+="<input type='range' min='0' max='100' id='volume_range'>";
	html+="<input type='hidden' value='"+song["music_id"]+"' id='now_playing_music'>";
	html+="</div>";
	html+="</div>";
	return html;
}

function add_player_listeners(){
	var cur=document.getElementById("play_current_song");

	cur.addEventListener("click",function(){
			audio.play();
	});
	
	document.getElementById("volume_range").addEventListener("change",function(){
			audio.volume=this.value/100;
	});

	document.getElementById("current_playing_music_time").addEventListener("change",function(){
			audio.currentTime=this.value;
	});

	audio.addEventListener("loadeddata", function() {
		document.getElementById("current_playing_music_time").setAttribute("max",audio.duration);
	});
}