

function player_left_side(to_play_music){
	var band=get_band_info(to_play_music["band_id"]);

	var html="";
	html+="<div class='player_left_side'>";
	html+="<h1 id='player_left_name' >"+band["name"]+":"+to_play_music["name"]+"</h1>";
	html+="		<img src="+band["cover"]+" width='300' height='300' id='music_player_cover_photo'>";
	html+="		<div class='player_left_bottom'>";
	html+="			<audio controls id='music_player_audio'>";
	html+="				<source src="+to_play_music["src"]+" type='audio/mpeg' id='music_player_now_playing' name='"+to_play_music["music_id"]+"'>";
	html+="			</audio>";
	html+="			<input type='range' min='0' max='100' class='music_player_volume display_none' id='music_player_volume'>";
	html+="			<div class='music_player_placeholder' id='music_player_placeholder'></div>";
	html+="		</div>";
	html+="</div>";
	return html;
}

function other_music_entry(index,music_name,music_path){
	var html="";
	html+="<div class='other_music_entry'>";
	html+="		<div class='other_music_centered'>";
	html+="			<span>"+index+") "+music_name+"</span>";
	html+="			<button class='other_music_play_button other_music_passive_button' id='other_music_entryN"+index+"' name="+index+">play now</button>";
	html+="		</div>";
	html+="</div>";
	return html;
}

function player_right_side(music){
	var html="";
	html+="<div class='music_player_other_music'>";

	for(var i=0;i<music.length;i++){
		var band=get_band_info(music[i]["band_id"]);
		html+=other_music_entry(i+1,band["name"]+":"+music[i]["name"],music[i]["path"]);
	}

	html+="</div>";
	return html;
}


function get_music_player(){
	var music=get_all_music();

	var html="";
	html+="<div class='music_player'>";
	html+=player_left_side(music[0]);
	html+=player_right_side(music);
	html+="</div>";
	return html;
}

function add_music_player_listeners(){
	var cur;
	cur=document.getElementById("music_player_volume");
	cur.addEventListener("mouseout",function(){
			this.classList.add("display_none");
	});

	cur.addEventListener("change",function(){
			document.getElementById('music_player_audio').volume=this.value/100;
	});


	cur=document.getElementById("music_player_placeholder");

	cur.addEventListener("mouseover",function(){
			document.getElementById('music_player_volume').classList.remove("display_none");
	});

	var el=document.getElementById("other_music_entryN1");
	el.classList.remove("other_music_passive_button");
	el.innerHTML="playing";

	var music_cnt=get_music_count();
	for(var i=0;i<music_cnt;i++){
		cur=document.getElementById("other_music_entryN"+(i+1));
		cur.addEventListener("click",function(){

			var now_playing_id=document.getElementById('music_player_now_playing').getAttribute("name");
			now_playing_id++;
			var cur_el=document.getElementById("other_music_entryN"+now_playing_id);
			cur_el.classList.add("other_music_passive_button");
			cur_el.innerHTML="play now";

			cur_el=document.getElementById("other_music_entryN"+(i+1));
			this.classList.remove("other_music_passive_button");
			this.innerHTML="playing";

			var next_to_play=get_ith_music(parseInt(this.getAttribute("name"))-1);
			var band=get_band_info(next_to_play["band_id"]);
			document.getElementById("player_left_name").innerHTML=band["name"]+":"+next_to_play["name"];
			document.getElementById("music_player_cover_photo").src=band["cover"];

			var now_playing=document.getElementById("music_player_now_playing");
			now_playing.src=next_to_play["src"];
			now_playing.setAttribute("name",parseInt(this.getAttribute("name"))-1);
			document.getElementById("music_player_audio").load();
			document.getElementById("music_player_audio").play();
		});
	}
}