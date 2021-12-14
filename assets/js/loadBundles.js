var ApiCall_BundleTitle;
var ApiCall_ImageSource;

function makeCallAndBuildElements() {
   $.ajax({
      url: `https://valorant-api.com/v1/bundles`,
      type: 'get',
      success: function(data, jqXHR) {
         var count;
         for(var count = 0; count < 1000; count++) {
            if(data.data[count].displayIcon2 == "https://media.valorant-api.com/bundles/fc723fef-444a-4013-a741-3e85a97382f2/displayicon2.png") {
               continue
            } else if(data.data[count].displayIcon2 == "https://media.valorant-api.com/bundles/338cabdb-473f-1f37-fa35-47a3d994517f/displayicon2.png"){
               continue
            } else {
               ApiCall_BundleTitle = data.data[count].displayName
               ApiCall_ImageSource = data.data[count].displayIcon2
            }
            
//------------------------------------ CREATING ELEMENT --------------------------------------------------------

            var displayBundleName = document.createTextNode(ApiCall_BundleTitle);
            var displayHoverName = document.createTextNode(ApiCall_BundleTitle);
         
            var bundlecardHandlerDiv = document.createElement("div");
            bundlecardHandlerDiv.classList.add("col-xs-6", "col-md-3", "col-xl-1");
         
            var bundlecardDiv = document.createElement("div");
            bundlecardDiv.classList.add(`bundlecard`);
            bundlecardDiv.setAttribute("onclick", "shiftBundleView(this.lastChild.firstChild.textContent, this.firstChild.id)");
         
            var bundlecardImage = document.createElement("img");
            bundlecardImage.className = "bundle-image";
            bundlecardImage.src = ApiCall_ImageSource;
            bundlecardImage.setAttribute("id", `card-image-${count + 1}`);
         
            var bundlecardHoverDiv = document.createElement("div");
            bundlecardHoverDiv.className = "bundlecard-hovertext";
            var bundlecardHoverText = document.createElement("span");
            bundlecardHoverText.setAttribute("id", `bundlename-${count + 1}`);
         
            var bundlecardSepDiv = document.createElement("div");
            bundlecardSepDiv.className = "bundlecard-seperator";
            var bundlecardSepHr = document.createElement("hr");
            bundlecardSepHr.className = "bundlecard-seperator-hr";
         
            var bundletitleDiv = document.createElement("div");
            bundletitleDiv.className = "bundletitle-div";
            var bundleTitle = document.createElement("span");
            bundleTitle.className = "bundle-title";
         
            bundlecardHandlerDiv.appendChild(bundlecardDiv);
         
            bundlecardDiv.appendChild(bundlecardImage);
            bundlecardDiv.appendChild(bundlecardHoverDiv);
            bundlecardDiv.appendChild(bundlecardSepDiv);
            bundlecardDiv.appendChild(bundletitleDiv);
         
            bundlecardSepDiv.appendChild(bundlecardSepHr);
            bundlecardHoverDiv.appendChild(bundlecardHoverText);
            bundlecardHoverText.appendChild(displayBundleName);
            
            bundletitleDiv.appendChild(bundleTitle);
            bundleTitle.appendChild(displayBundleName);
            bundlecardHoverText.appendChild(displayHoverName);
         
            var cardGrid = document.getElementById("cardGrid");
            var nextElement = document.getElementById("nextElement");
            cardGrid.insertBefore(bundlecardHandlerDiv, nextElement);

//----------------------------------------------------------------------------------------------------------------

            if(count == null) {
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