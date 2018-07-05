

function send_post_request(url,data,raise_function,arg){
	var http=new XMLHttpRequest();
	var params=data;
	http.open('post',url,false);

	http.setRequestHeader('Content-Type','application/json');

	http.onreadystatechange=function(){
	    if(http.readyState==4&&http.status==200) {
	        raise_function(http.responseText,arg);
	    }
	}
	http.send(params);
}