

module.exports=function(grunt){
	grunt.registerTask('speak',function(){
		console.log("hello");
	});

	grunt.initConfig({
		concat:{
			js:{
				src: ["translated/real_music_player.js","other/database/all_music.js",
				"other/database/bands.js","translated/music_player.js", 
				"other/database/language.js"],
				dest: "build/main.js",
			},
			css:{
				src: ["css/music_player.css","css/real_music_player.css","css/header.css","css/main.css", "css/responsive.css"],
				dest: "build/styles.css",
			},
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
};