const replaceText = (text) => {
   const element = document.getElementById("search-output");
   if (element) element.innerText = text
}
 
 var ApiCall_BuddyTitle;
 var ApiCall_ImageSource;
 
function createDiv() {
   var displayBuddyName = document.createTextNode(ApiCall_BuddyTitle);
   var displayHoverName = document.createTextNode(ApiCall_BuddyTitle);
 
   var buddycardHandlerDiv = document.createElement("div");
   buddycardHandlerDiv.classList.add("col-xs-3", "col-md-2", "col-xl-1");
 
   var buddycardDiv = document.createElement("div");
   buddycardDiv.className = "buddycard";
 
   var buddycardImage = document.createElement("img");
   buddycardImage.className = "buddy-image";
   buddycardImage.id = "img";
   buddycardImage.src = ApiCall_ImageSource;
 
   var buddycardHoverDiv = document.createElement("div");
   buddycardHoverDiv.className = "buddycard-hovertext";
   var buddycardHoverText = document.createElement("span");
 
   var buddycardSepDiv = document.createElement("div");
   buddycardSepDiv.className = "buddycard-seperator";
   var buddycardSepHr = document.createElement("hr");
   buddycardSepHr.className = "buddycard-seperator-hr";
 
   var buddytitleDiv = document.createElement("div");
   buddytitleDiv.className = "buddytitle-div";
   var buddyTitle = document.createElement("span");
   buddyTitle.className = "buddy-title";
 
   buddycardHandlerDiv.appendChild(buddycardDiv);
 
   buddycardDiv.appendChild(buddycardImage);
   buddycardDiv.appendChild(buddycardHoverDiv);
   buddycardDiv.appendChild(buddycardSepDiv);
   buddycardDiv.appendChild(buddytitleDiv);
 
   buddycardSepDiv.appendChild(buddycardSepHr);
   buddycardHoverDiv.appendChild(buddycardHoverText);
    
   buddytitleDiv.appendChild(buddyTitle);
   buddyTitle.appendChild(displayBuddyName);
   buddycardHoverText.appendChild(displayHoverName);

   var cardGrid = document.getElementById("cardGrid-buddys");
   var nextElement = document.getElementById("nextElement");
   cardGrid.insertBefore(buddycardHandlerDiv, nextElement);
}
 
function makeCallAndBuildElements() {
   $.ajax({
      url: `https://valorant-api.com/v1/buddies`,
      type: 'get',
      success: function(data, jqXHR) {
         var count;
         for(var count = 0; count < 10000; count++) {
            ApiCall_BuddyTitle = data.data[count].displayName
            ApiCall_ImageSource = data.data[count].displayIcon
            createDiv();
            if(count == undefined) {
               break;
            }
         }
      },
      error: function(jqXHR) {
         //get the status code
         if (jqXHR.status == 400) {
            replaceText('400, Bad Request');
         }
         if (jqXHR.status == 401) {
            replaceText('401, Unauthorized');
         }
         if (jqXHR.status == 403) {
            replaceText('403, Name/Tag Missing!');
         }
         if (jqXHR.status == 404) {
            replaceText('404, No player found!');
         }
         if (jqXHR.status == 405) {
            replaceText('405, Not allowed!');
         }
         if (jqXHR.status == 415) {
            replaceText('415, unsupported Media Type');
         }
         if (jqXHR.status == 429) {
            replaceText('429, Rate limit exceeded, try again later');
         }
         if (jqXHR.status == 500) {
            replaceText('500, Internal Server Error');
         }
         if (jqXHR.status == 502) {
            replaceText('502, Bad Gateway');
         }
         if (jqXHR.status == 503) {
            replaceText('503, Service unavailable');
         }
         if (jqXHR.status == 504) {
            replaceText('504, Gateway timeout');
         }
      },
   });
}
 
$(document).ready(() => {
   makeCallAndBuildElements();
});