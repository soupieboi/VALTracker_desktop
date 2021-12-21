function makeCallAndBuildElements() {
   var path = window.location.pathname;
   var page = path.split("/").pop();
   if(page == "cardsPage.html") {
      $.ajax({
         url: `https://valorant-api.com/v1/playercards`,
         type: 'get',
         success: function(data, jqXHR) {
            for(var count = 0; count < data.data.length; count++) {
               var skinHandler = document.createElement("div");
               skinHandler.className = "card-wrapper";

               var cardImage = document.createElement("img");
               cardImage.className = "wide-card-image";
               cardImage.src = data.data[count].wideArt;
               skinHandler.appendChild(cardImage);

               var cardName = document.createElement("span");
               cardName.className = "card-name";
               cardName.setAttribute("id", "itemName");
               cardName.appendChild(document.createTextNode(data.data[count].displayName))
               skinHandler.appendChild(cardName);

               if(data.data[count].isHiddenIfNotOwned == true || data.data[count].displayName.includes("Beta")) {
                  var isTitleObtainable = document.createElement("span");
                  isTitleObtainable.className = "exclusive-title"
                  isTitleObtainable.appendChild(document.createTextNode("! This Card is exclusive !"))

                  skinHandler.appendChild(isTitleObtainable);
               }
      
               var wrapper = document.getElementById("skins-handler");
               var nextElement = document.getElementById("pageBottom");
               wrapper.insertBefore(skinHandler, nextElement);
            }
         }
      });
   } else if(page == "spraysPage.html") {
      $.ajax({
         url: `https://valorant-api.com/v1/sprays`,
         type: 'get',
         success: function(data, jqXHR) {
            for(var count = 0; count < data.data.length; count++) {
               var skinHandler = document.createElement("div");
               skinHandler.className = "spray-wrapper";

               var cardImage = document.createElement("img");
               cardImage.className = "wide-card-image";
               if(data.data[count].fullTransparentIcon) {
                  cardImage.src = data.data[count].fullTransparentIcon;
               } else {
                  cardImage.src = data.data[count].displayIcon;
               }
               skinHandler.appendChild(cardImage);

               var cardName = document.createElement("span");
               cardName.className = "card-name";
               cardName.setAttribute("id", "itemName");
               cardName.appendChild(document.createTextNode(data.data[count].displayName))
               skinHandler.appendChild(cardName);

               if(data.data[count].isHiddenIfNotOwned == true || data.data[count].displayName.includes("Beta")) {
                  var isTitleObtainable = document.createElement("span");
                  isTitleObtainable.className = "exclusive-title"
                  isTitleObtainable.appendChild(document.createTextNode("! This Card is exclusive !"))

                  skinHandler.appendChild(isTitleObtainable);
               }
      
               var wrapper = document.getElementById("skins-handler");
               var nextElement = document.getElementById("pageBottom");
               wrapper.insertBefore(skinHandler, nextElement);
            }
         }
      });
   } else if(page == "titlesPage.html") {
      $.ajax({
         url: `https://valorant-api.com/v1/playertitles`,
         type: 'get',
         success: function(data, jqXHR) {
            for(var count = 0; count < data.data.length; count++) {
               if(data.data[count].titleText == null) {
                  continue;
               }
               var skinHandler = document.createElement("div");
               skinHandler.className = "title-wrapper";
               //skinHandler.setAttribute("onclick", "toggleSkinInfo(this.children[1].textContent)")

               var titleName = document.createElement("span");
               titleName.className = "title-name";
               titleName.appendChild(document.createTextNode(data.data[count].titleText))
               titleName.setAttribute("id", "itemName");
               skinHandler.appendChild(titleName);

               if(data.data[count].isHiddenIfNotOwned == true) {
                  var isTitleObtainable = document.createElement("span");
                  isTitleObtainable.className = "exclusive-title"
                  isTitleObtainable.appendChild(document.createTextNode("! This Title is exclusive !"))

                  skinHandler.appendChild(isTitleObtainable);
               }
      
               var wrapper = document.getElementById("skins-handler");
               var nextElement = document.getElementById("pageBottom");
               wrapper.insertBefore(skinHandler, nextElement);
               
            }
         }
      });
   } else {
      $.ajax({
         url: `https://valorant-api.com/v1/weapons`,
         type: 'get',
         success: function(data, jqXHR) {
            for(var count = 0; count < data.data.length; count++) {
               var PageName = document.getElementById('pageheader').textContent;
               var weapon = PageName.split(" ")
               if(data.data[count].displayName == weapon[1]) {
                  $('.skin-page-default-img').attr("src", data.data[count].displayIcon)
                  $('.single-skin-img').attr("src", data.data[count].displayIcon)
                  $('.pageheader-skincount-nr').append(data.data[count].skins.length)
                  for(var count2 = 0; count2 < data.data[count].skins.length; count2++) {
                     if(data.data[count].skins[count2].displayName.includes("Standard") || data.data[count].skins[count2].displayName == "Melee" || data.data[count].skins[count2].displayName == "Luxe") {
                        continue;
                     }
   
                     var skinHandler = document.createElement("div");
                     skinHandler.className = "skin-wrapper";
                     //skinHandler.setAttribute("onclick", "toggleSkinInfo(this.children[1].textContent)")
   
                     var skinimg = document.createElement("img");
                     skinimg.className = "single-skin-img";
                     if(data.data[count].skins[count2].displayName == "Luxe Knife") {
                        skinimg.setAttribute("src", data.data[count].skins[count2].chromas[0].fullRender);
                     } else {
                        if(!data.data[count].skins[count2].displayIcon) {
                           skinimg.setAttribute("src", data.data[count].skins[count2].chromas[0].fullRender);
                        } else {
                           skinimg.setAttribute("src", data.data[count].skins[count2].displayIcon);
                        }
                     } 
   
                     var skinName = document.createElement("span");
                     skinName.className = "skin-name";
                     skinName.appendChild(document.createTextNode(data.data[count].skins[count2].displayName))
                     skinName.setAttribute("id", "itemName");
                     var skinColorCount = document.createElement("span");
                     if(data.data[count].skins[count2].chromas.length == 1 || data.data[count].skins[count2].chromas.length == 0) {
                        skinColorCount.className = "skin-color-options-grey";
                        skinColorCount.appendChild(document.createTextNode("Color Options: None"))
                     } else {
                        skinColorCount.className = "skin-color-options";
                        skinColorCount.appendChild(document.createTextNode("Color Options: " + data.data[count].skins[count2].chromas.length))
                     }
   
                     var skinLevelCount = document.createElement("span");
                     if(data.data[count].skins[count2].chromas.length == 1 || data.data[count].skins[count2].chromas.length == 0) {
                        skinLevelCount.className = "skin-levels-grey";
                        skinLevelCount.appendChild(document.createTextNode("Skin Levels: None"))
                     } else {
                        skinLevelCount.className = "skin-levels";
                        skinLevelCount.appendChild(document.createTextNode("Skin Levels: " + data.data[count].skins[count2].levels.length))
                     }
   
                     skinHandler.appendChild(skinimg);
                     skinHandler.appendChild(skinName);
                     skinHandler.appendChild(skinColorCount);
                     skinHandler.appendChild(skinLevelCount);
            
                     var wrapper = document.getElementById("skins-handler");
                     var nextElement = document.getElementById("pageBottom");
                     wrapper.insertBefore(skinHandler, nextElement);
                  }
               }
            }
         }
      });
   }
}

$(document).ready(() => {
   makeCallAndBuildElements();
})