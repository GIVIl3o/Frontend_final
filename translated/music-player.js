"use strict";

function addMusicPlayerListeners() {
    previousSong();
    pauseSong();
    playSong();
    nextSong();
    shuffleSong();
    muteUnmute();
    volumeChange();
    likeSong();
    slider_change();
}

function play_next_song(song) {
    create_new_audio(song["src"]);
    document.getElementById("playlist_cover_photo").src = song["band_cover"];
    document.getElementById("playlist_music_name").innerHTML = song["name"] + ":" + song["band_name"];
}
function get_music_json(next_to_play) {
    var next_music = {
        name: next_to_play.querySelector(".playlist_song_name").innerHTML,
        src: next_to_play.querySelector(".music_src").innerHTML,
        band_name: next_to_play.querySelector(".playlist_song_band").innerHTML,
        band_cover: next_to_play.querySelector(".band_cover").innerHTML,
        id: parseInt(next_to_play.querySelector(".music_id").innerHTML)
    };
    return next_music;
}
function playlist_play_next() {
    var playlist = document.getElementById("playlist");

    var index = parseInt(document.getElementById("now_playing_playlist_index").value);

    if (playlist.childNodes.length > 0 && parseInt(document.getElementById("shuffle_playlist").value) == 1) {
        index = Math.floor(Math.random() * playlist.childNodes.length) - 1;
    }
    var next_to_play = playlist.childNodes[index + 1];

    document.getElementById("now_playing_playlist_index").value = index + 1;
    audio.pause();

    if (typeof next_to_play === "undefined") {
        document.getElementById("pause-song").click();
        return;
    }

    var next_music = get_music_json(next_to_play);
    play_next_song(next_music);
    audio.play();
}

function slider_change() {
    document.getElementById("music-slider").addEventListener("change", function () {
        audio.currentTime = document.getElementById("music-slider").value;
    });
}

function previousSong() {
    var previousSong = document.querySelector("#previous-song");
    previousSong.addEventListener("click", function () {
        var index = parseInt(document.getElementById("now_playing_playlist_index").value);
        if (index == 0) {
            audio.pause();
            document.getElementById("pause-song").click();
            return;
        }
        document.getElementById("now_playing_playlist_index").value = index - 2;
        playlist_play_next();
    });
}

function pauseSong() {
    var playSong = document.querySelector("#play-song");
    playSong.addEventListener("click", function () {

        document.getElementById("play-song").classList.remove("fas");
        document.getElementById("play-song").classList.add("show_item");
        document.getElementById("pause-song").classList.remove("show_item");
        document.getElementById("pause-song").classList.add("fas");

        audio.play();
    });
}

function playSong() {
    var pauseSong = document.querySelector("#pause-song");
    pauseSong.addEventListener("click", function () {

        document.getElementById("pause-song").classList.remove("fas");
        document.getElementById("pause-song").classList.add("show_item");
        document.getElementById("play-song").classList.remove("show_item");
        document.getElementById("play-song").classList.add("fas");
        audio.pause();
    });
}

function nextSong() {
    var nextSong = document.querySelector("#next-song");
    nextSong.addEventListener("click", function () {
        playlist_play_next();
    });
}

function shuffleSong() {
    var shuffleSong = document.querySelector("#shuffle-song");
    shuffleSong.addEventListener("click", function () {
        var val = parseInt(document.getElementById("shuffle_playlist").value);
        val = 1 - val;
        document.getElementById("shuffle_playlist").value = val;
        if (val == 1) {
            document.getElementById("shuffle-song").classList.remove("fa-color");
            document.getElementById("shuffle-song").classList.add("shuffle_color");
        } else {
            document.getElementById("shuffle-song").classList.add("fa-color");
            document.getElementById("shuffle-song").classList.remove("shuffle_color");
        }
    });
}

function muteUnmute() {
    var volume = document.querySelector("#volume");
    volume.addEventListener("click", function () {
        console.log("unmute");
    });
}

function volumeChange() {
    var volume = document.querySelector("#volume-slider");
    volume.addEventListener("change", function () {
        audio.volume = volume.value;
    });
}

function likeSong() {
    var likeSong = document.querySelector("#like-song");
    likeSong.addEventListener("click", function () {
        console.log("like");
    });
}

addMusicPlayerListeners();