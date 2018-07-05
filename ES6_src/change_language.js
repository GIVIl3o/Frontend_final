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
        language_words = get_translate_words_eng();
    }
    else {
        language_words = get_translate_words_geo();
    }

    for(var i=0; i<get_translate_words_count(); i++) {
        var language_id = ids[i];

        if(document.querySelector("#"+language_id)==null)continue;

        if(id_get_type(language_id)=="innerHTML")
            document.querySelector("#" + language_id).innerText = language_words[i];
        
        if(id_get_type(language_id)=="placeholder")
            document.querySelector("#" + language_id).placeholder=language_words[i];

        if(id_get_type(language_id)=="value")
            document.querySelector("#" + language_id).value=language_words[i];
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
