"use strict";

function authentication_html(upper_text, submit_text, url, registration) {
	var html = "";
	html += "<div class='authentication_form'>";
	html += "		<div class='centered'><span id='authentication_error' class='authentication_error' ></span></div>";
	html += "		<h3 id='authentication_text" + registration + "'>" + upper_text + "</h3>";
	html += "		<div>";
	html += "			<div class='centered'><input type='text' class='form_input' placeholder='Login' id='username'></div>";
	html += "			<div class='centered'><input type='password' class='form_input' placeholder='Password' id='password'><br></div>";
	html += "			<div class='centered' ><input class='form_submit' type='submit' value='" + submit_text + "' id='login_button" + registration + "'></div>";
	html += "			<input type='hidden' id='authentication_type' value='" + url + "'>";
	html += "		</div>";
	html += "</div>";
	return html;
}

function login_response(response, not_used) {
	if (response.length == 0) {
		window.location.href = "#profile";
		document.getElementById("authentication_div").innerHTML = "<a class='menu-item flex' id='my_profile' href='#profile'>Profile</a>";
		document.getElementById("authentication_div").addEventListener("click", function () {
			cur_user = user_name;
		});
		cur_user = user_name;
		document.getElementById("upload_new_content").classList.remove("visibility_none");
	} else {
		user_name = null;
		var el = document.getElementById("authentication_error");
		el.innerHTML = response;
		el.classList.add("show_authentication_error");
		setTimeout(function () {
			document.getElementById("authentication_error").classList.remove("show_authentication_error");
		}, 3000);
	}
}

function add_login_listeners() {
	var log_button = document.getElementById("login_button0");
	if (log_button == null) log_button = document.getElementById("login_button1");
	log_button.addEventListener("click", function () {
		var data = {
			username: document.getElementById("username").value,
			password: document.getElementById("password").value
		};
		user_name = data["username"];
		data = JSON.stringify(data);
		send_post_request(document.getElementById("authentication_type").value, data, login_response, null);
	});
}