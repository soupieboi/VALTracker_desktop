function toggle(){
  var sec = document.getElementById('sec');
  sec.classList.toggle('active');
}

$(document).ready(() => {
  var coll = document.getElementsByClassName("collapsible");
  var i;
  var path = window.location.pathname;
  var page = path.split("/").pop();
  console.log(page);

  for (i = 0; i < coll.length; i++) {
    if(page == "buddys.html" || page == "bundles.html") {
      window.addEventListener("load", function() {
        var collTest = document.getElementById("collects")
        collTest.classList.toggle("active")
        var content = collTest.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
      });
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
})