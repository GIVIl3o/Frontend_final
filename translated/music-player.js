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

function slider_change() {
    document.getElementById("music-slider").addEventListener("change", function () {
        audio.currentTime = document.getElementById("music-slider").value;
    });
}

function previousSong() {
    var previousSong = document.querySelector("#previous-song");
    previousSong.addEventListener("click", function () {
        console.log("previous");
    });
}

function pauseSong() {
    var playSong = document.querySelector("#play-song");
    playSong.addEventListener("click", function () {
        document.querySelector("#play-song").style = "display:none";
        document.querySelector("#pause-song").style = "display:inline";

        audio.play();
    });
}

function playSong() {
    var pauseSong = document.querySelector("#pause-song");
    pauseSong.addEventListener("click", function () {
        document.querySelector("#pause-song").style = "display:none";
        document.querySelector("#play-song").style = "display:inline";

        audio.pause();
    });
}

function nextSong() {
    var nextSong = document.querySelector("#next-song");
    nextSong.addEventListener("click", function () {
        console.log("next");
    });
}

function shuffleSong() {
    var shuffleSong = document.querySelector("#shuffle-song");
    shuffleSong.addEventListener("click", function () {
        console.log("shuffle");
    });
}

function muteUnmute() {
    var volume = document.querySelector("#volume");
    volume.addEventListener("click", function () {
        console.log("unmute");
    });
}

function volumeChange() {
    var volume = document.querySelector("#volume");
    volume.addEventListener("mouseenter", function () {
        var volumeSlider = document.querySelector("#volume-slider");
        volumeSlider.style = "display: block;";
    });
    volume.addEventListener("mouseout", function () {
        var volumeSlider = document.querySelector("#volume-slider");
        volumeSlider.style = "display: none;";
    });
}

function likeSong() {
    var likeSong = document.querySelector("#like-song");
    likeSong.addEventListener("click", function () {
        console.log("like");
    });
}

addMusicPlayerListeners();