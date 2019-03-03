function onsubscribe(){
	var value = $("#txtsubscribe").val();
	if(validateEmail(value)){
	
	
	 $.get("http://menamark-me.com/subscripemenamark.php?mailid="+value, function(data, status){
       
    });
	
	$("#subscribe").empty();
	$("#subscribe").html("<p>Thank you <br/>"+value+"</p>");
	}


 }
 
 function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}