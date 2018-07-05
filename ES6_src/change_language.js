function AddLanguageListeners() {
    var cur = document.querySelector("#main-language");
    var cur1 = document.querySelector("#second-language");
    cur.addEventListener("click", function() {
        ChangeLanguage(cur.innerText);
    })

    cur1.addEventListener("click", function() {
        ChangeLanguage(cur1.innerText);
    })
}
 
function ChangeLanguage(a) {
    localStorage.setItem("language", a);

    var ids = get_translate_words_ids();
    var language_words;
    if(a == "ENG") {
        document.getElementById("search-field").placeholder="Search";
        language_words = get_translate_words_eng();
    }
    else {
        document.getElementById("search-field").placeholder="ძებნა";
        language_words = get_translate_words_geo();
    }

    for(var i=0; i<get_translate_words_count(); i++) {
        var language_id = ids[i];
        document.querySelector("#" + language_id).innerText = language_words[i];
    }
}

function setDefaultLanguage() {
    if(localStorage.getItem("language") == null) {
        localStorage.setItem("language", "ENG");
    } 
    ChangeLanguage(localStorage.getItem("language"));
}

AddLanguageListeners();
setDefaultLanguage();