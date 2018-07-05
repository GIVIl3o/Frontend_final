

function send_post_request(url,data,raise_function,arg){
	var http=new XMLHttpRequest();
	var params=data;
	http.open('post',url,false);

	http.setRequestHeader('Content-type','application/x-www-form-urlencoded');

	http.onreadystatechange=function(){
	    if(http.readyState==4&&http.status==200) {
	        var obj=JSON.parse(http.responseText);
	        raise_function(obj,arg);
	    }
	}
	http.send(params);
}