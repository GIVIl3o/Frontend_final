var translate_words = [
	{	
        id: "l-songs",
        set_type: "innerHTML",
        GEO: "სიმღერები",
        ENG:"Songs",
	},
    {	
        id: "l-albums",
        set_type: "innerHTML",
        GEO: "ალბომები",
        ENG:"Albums",
    },
    {	
        id: "l-singers",
        set_type: "innerHTML",
        GEO: "მომღერლები",
        ENG:"Singers",
    },
    {	
        id: "l-y-playlists",
        set_type: "innerHTML",
        GEO: "შენი სიები",
        ENG:"Your Playlists",
    },
    {
        id: "log-in",
        set_type: "innerHTML",
        GEO: "ავტორიზაცია",
        ENG: "Log In",
    },
    {
        id: "search-field",
        set_type: "placeholder",
        GEO: "ძებნა",
        ENG: "Search",
    },
    {
        id: "registration",
        set_type: "innerHTML",
        GEO: "რეგისტრაცია",
        ENG: "Registration",
    },
    {
        id: "authentication_text0",
        set_type: "innerHTML",
        GEO: "ექაუნთში შესვლა",
        ENG: "Log In",
    },
    {
        id: "authentication_text1",
        set_type: "innerHTML",
        GEO: "რეგისტრაცია",
        ENG: "Registration",
    },
    {
        id: "username",
        set_type: "placeholder",
        GEO: "მომხმარებლის სახელი",
        ENG: "Username",
    },
    {
        id: "password",
        set_type: "placeholder",
        GEO: "პაროლი",
        ENG: "password",
    },
    {
        id: "login_button0",
        set_type: "value",
        GEO: "შესვლა",
        ENG: "GET STARTED",
    },
    {
        id: "login_button1",
        set_type: "value",
        GEO: "რეგისტრაცია",
        ENG: "REGISTER",
    },
    {
        id: "profile-tracks",
        set_type: "innerHTML",
        GEO: "სიმღერები",
        ENG: "Tracks",
    },
    {
        id: "profile-albums",
        set_type: "innerHTML",
        GEO: "ალბომები",
        ENG: "Albums",
    },
    {
        id: "profile-playlists",
        set_type: "innerHTML",
        GEO: "სიები",
        ENG: "Playlists",
    },
    {
        id: "rofile-followers",
        set_type: "innerHTML",
        GEO: "მომყოლები",
        ENG: "Followers",
    },
    {
        id: "profile-playlists",
        set_type: "innerHTML",
        GEO: "მიყვები",
        ENG: "Following",
    },
    {
        id: "new_playlist_name",
        set_type: "placeholder",
        GEO: "სიის სახელი",
        ENG: "Playlist name",
    },
    {
        id: "save_pl_button",
        set_type: "innerHTML",
        GEO: "შენახვა",
        ENG: "save",
    },
    {
        id: "profile-playlists",
        set_type: "innerHTML",
        GEO: "სიები",
        ENG: "Playlists",
    },
    {
        id: "my_profile",
        set_type: "innerHTML",
        GEO: "პროფილი",
        ENG: "Profile",
    },
];

function get_translate_words_ids() {
    var ids = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        ids.push(translate_words[i].id);
    }
    return ids;
}

function id_get_type(id){
    for(var i=0; i<get_translate_words_count(); i++) {
        if(id==translate_words[i]["id"])
            return translate_words[i]["set_type"];
    }
    return -1;
}

function get_translate_words_eng() {
    var eng = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        eng.push(translate_words[i].ENG);
    }
    return eng;
}

function get_translate_words_geo() {
    var geo = [];
    for(var i=0; i<get_translate_words_count(); i++) {
        geo.push(translate_words[i].GEO);
    }
    return geo;
}

function get_all_translate_words(){
	return translate_words;
}

function get_translate_words_count(){
	return translate_words.length;
}

function get_ith_translate_word(i){
	return translate_words[i];
}