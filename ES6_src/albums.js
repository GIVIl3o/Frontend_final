
function createAlbumItem(album) {
    var html = "";
    html+="<div class='album-list-item '> "
    html+="     <img src='"+album["band_cover"]+"' class='album-cover' alt='?' id='singerN"+album["id"]+"'>"
    html+="     <div class='album-name'><h3>"+album["band_name"]+"</h3></div>";
    html+="     <input type='hidden' class='current_band_id' value='"+album["id"]+"'>";
    html+="</div>"
    return html;
}

function createAlbumList(response,el) {
    console.log(response);
    response=JSON.parse(response);
    var albumList = "";
    albumList += "<div class='album-list clearfix'>";
    
    for(var i=0;i<response.length;i++){
        albumList+=createAlbumItem(response[i]);
    }

    albumList += "</div>";

    el.innerHTML=albumList;

    for(var i=0;i<response.length;i++){
        document.getElementById("singerN"+response[i]["id"]).addEventListener("click",function(){
            var val=this.parentElement.querySelector(".current_band_id").value;
            alert(val);
        });
    }
}