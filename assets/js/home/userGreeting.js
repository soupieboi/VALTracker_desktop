var welcome;  
var date = new Date();  
var hour = date.getHours();  
var minute = date.getMinutes();  
var second = date.getSeconds();  
if (minute < 10) {  
    minute = "0" + minute;  
}  
if (second < 10) {  
    second = "0" + second;  
}  
if (hour < 12) {  
    welcome = "Good morning";  
} else if (hour < 17) {  
    welcome = "Good afternoon";  
} else {  
    welcome = "Good evening";  
}

$('.user-greetings').append(welcome + ", User")