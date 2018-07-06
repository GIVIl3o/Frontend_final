
function other_music_entry(index,music_name,music_path,cover_path,music_id){
	var html="";
	html+="<div class='other_music_entry'>";
	html+="		<div class='other_music_centered'>";
	html+="			<button class='other_music_play_now' id='other_music_entryN"+index+"' name="+index+"></button>";
	html+="			<div class='other_music_text'>";
	html+="			<span>"+music_name+"</span><br><a href='#' class='music_uploader'>author</a>";
	html+="			</div>";
	html+="			<button class='other_music_play_button' name="+index+" id='add_to_playlistN"+index+"'>add to playlist</button>";
	html+="			<span class='display_none' id='other_music_full_nameN"+index+"'>"+music_name+"</span>";
	html+="			<img src='"+cover_path+"' class='display_none' id='other_music_coverN"+index+"'>";
	html+="			<input type='hidden' value="+music_id+" id='secret_music_idN"+music_id+"'>";
	html+="		</div>";
	html+="</div>";
	return html;
}

function player_right_side(music){
	var html="";
	html+="<div class='music_player_other_music'>";

	for(var i=0;i<music.length;i++){
		html+=other_music_entry(i+1,music[i]["band_name"]+":"+music[i]["name"],music[i]["path"],music[i]["band_cover"],music[i]["id"]);
	}

	html+="</div>";
	return html;
}


function get_music_player(all_music,put_html){
	all_music=JSON.parse(all_music);
	
	var html="";
	html+="<div class='possible_music'>";
	html+=player_right_side(all_music);
	html+="</div>";

	put_html.innerHTML=html;
	add_music_player_listeners(all_music);

	if(document.getElementById("playlist").innerHTML==""){
		play_next_song(all_music[0]);
		add_to_playlist(all_music[0]);
	}
}


function add_music_player_listeners(music){
	var cur;

	var el=document.getElementById("other_music_entryN1");
	el.classList.remove("other_music_passive_button");

	var music_cnt=music.length;

	for(var i=0;i<music_cnt;i++){
		cur=document.getElementById("other_music_entryN"+(i+1));

		cur.addEventListener("click",function(){

			var next_index=parseInt(this.getAttribute("name")-1);

			audio.pause();
			
			play_next_song(music[next_index]);

			next_index++;
			document.getElementById("playlist").innerHTML="";
			document.getElementById("play-song").click();
			document.getElementById("add_to_playlistN"+next_index).click();
			document.getElementById("now_playing_playlist_index").value=0;
		});

		cur=document.getElementById("add_to_playlistN"+(i+1)).addEventListener("click",function(){
			var next_index=parseInt(this.getAttribute("name")-1);
			var to_add=music[next_index];

			add_to_playlist(to_add);
			if(audio.paused){
				play_next_song(music[next_index]);
				document.getElementById("play-song").click();
				audio.play();
			}
		});
	}
}