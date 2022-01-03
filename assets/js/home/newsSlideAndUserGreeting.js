var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

const fs = require("fs")

var usernameSettingsFile = process.env.APPDATA + '/VALTracker/settings/home/displayedUsername.json'
if(fs.existsSync(usernameSettingsFile)) {
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/home/displayedUsername.json');
    let dataToRead = JSON.parse(rawdata);
    if(dataToRead.displayedUserName == "") {
        let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
        let dataToRead = JSON.parse(rawdata);
        var playerName = dataToRead.playerName
    } else {
        var playerName = dataToRead.displayedUserName
    }
} else {
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/userData.json');
    let dataToRead = JSON.parse(rawdata);
    var playerName = dataToRead.playerName
}

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

$('.user-greetings').append(welcome + ", " + playerName)