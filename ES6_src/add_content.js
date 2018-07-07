
function update_band_selector(bands,not_used){
	bands=JSON.parse(bands);
	var html="";
	html+="<select id='possible_bands'>";
	html+="<option value='' selected disabled hidden id='band_name_holder'>New music's band</option>";
	for(var i=0;i<bands.length;i++){
		html+="		<option value='"+bands[i]["id"]+"'>"+bands[i]["band_name"]+"</option>";
	}
	html+="</select>";

	document.getElementById("band_selector").innerHTML=html;
}

function add_content(){
	var html="";
	html+="<div id='add_content'>";
	html+="		<div id='add_band'>";
	html+="			<input type='text' placeholder='Band Name' id='new_band_name'><br><br>";
	html+="			<input type='text' placeholder='Image link' id='new_band_cover'><br><br>";
	html+="			<button class='add_content_btn' id='add_band_btn'>Add Band</button>";
	html+="		</div>";
	html+="		<div id='add_music'>";
	html+="			<div id='band_selector'></div><br><br>";
	html+="			<input type='text' placeholder='Music Name' id='new_music_name'><br><br>";
	html+="			<input type='text' placeholder='Music source' id='new_music_src'><br><br>";
	html+="			<button class='add_content_btn' id='add_music_btn'>Add Music</button>";
	html+="		</div>";
	html+="</div>";
	return html;
}

function content_added(response,not_used){
	if(response=="")alert("succ");
	else alert(response);
}

function new_content_listeners(){
	send_post_request("../php/get_all_bands.php",null,update_band_selector,"");

	document.getElementById("add_band_btn").addEventListener("click",function(){
		var data={
			band_name:document.getElementById("new_band_name").value,
			image_link:document.getElementById("new_band_cover").value,
		};
		send_post_request("../php/add_band.php",JSON.stringify(data),content_added,"");
		send_post_request("../php/get_all_bands.php",null,update_band_selector,"");
	});

	document.getElementById("add_music_btn").addEventListener("click",function(){
		var band_selector=document.getElementById("possible_bands");
		var data={
			music_name:document.getElementById("new_music_name").value,
			music_src:document.getElementById("new_music_src").value,
			band_id:band_selector.options[band_selector.selectedIndex].value,
			author: user_name,
		};
		send_post_request("../php/add_song.php",JSON.stringify(data),content_added,"");
	});
}