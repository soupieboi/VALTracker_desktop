function shiftBundleView(event, imageid) {
   var leaveShift = 1.05;
   var hiddenShift = 0.9;
   var endShift = 1;
   $('body').css('overflow', 'hidden');
   $('.app').css('transform', 'scale(' + leaveShift + ')');
   $('.bundle-largeview').css('transform', 'scale(' + hiddenShift + ')');
   $('.app').fadeTo(200, 0);
   $(".bundle-largeview").css({display: "block"});
   setTimeout(function() {
      $('.app').css('display', 'none');
      $(".bundle-largeview").css({display: "block"});
      $('.bundle-largeview').css('transform', 'scale(' + endShift + ')');
      $('body').css('border-bottom', 'none');
   }, 500)

   //------------------------------------ CREATING ELEMENT --------------------------------------------------------
         
   var largeviewBundleName = document.createElement("h1");
   largeviewBundleName.classList.add("largeview-bundlename");
   var BundleNameSpan = document.createElement("span");
   BundleNameSpan.classList.add("largeview-bundlename-span");
   BundleNameSpan.appendChild(document.createTextNode(event));

   var bundleinfoFlex = document.createElement("div");
   bundleinfoFlex.className = "largeview-bundleinfo-flex";

   var bundleImage = document.createElement("img");
   bundleImage.className = "largeview-bundleimage";
   var string = imageid;
   var newstring = string.replace(/displayicon2.png/, 'verticalpromoimage.png');

   console.log(bundleImage.src);
   var request;
   if(window.XMLHttpRequest)
      request = new XMLHttpRequest();
   else
      request = new ActiveXObject("Microsoft.XMLHTTP");
   request.open('GET', newstring, false);
   request.send(); // there will be a 'pause' here until the response to come.
   // the object request will be actually modified
   if(request.status === 404) {
      console.log("verticalPromoImage not found. Switching to displayicon...")
      var newstring = string.replace(/displayicon2.png/, 'displayicon.png');
   }

   bundleImage.src = newstring;

   var infoFlexRight = document.createElement("div");
   infoFlexRight.className = "largeinfo-bundleinfo-flex-right";

   var bundleinfoH1 = document.createElement("h1");
   bundleinfoH1.appendChild(document.createTextNode("Bundleinfo: "));
   var bundleInfoUl = document.createElement("ul");
   bundleInfoUl.className = "largeinfo-bundleinfo-flex-right-ul";

   var bundleInfoLi1 = document.createElement("li");
   var bundleInfoLi1Span = document.createElement("span");
   bundleInfoLi1Span.className = "bundle-cost";
   bundleInfoLi1Span.appendChild(document.createTextNode("Coming soon..."));

   var bundleInfoLi2 = document.createElement("li");
   var bundleInfoLi2Span = document.createElement("span");
   bundleInfoLi2Span.className = "extra-bundle-desc";


   var hr = document.createElement("hr");
   hr.className = "largeview-seperator";

   
   var bundleWeapons = document.createElement("div");
   bundleWeapons.className = "largeview-bundle-weapons";

   var bundleColorOptions = document.createElement("div");
   bundleColorOptions.className = "largeview-bundle-colors";
   
   var swatchImage;

   $.ajax({
      url: `https://valorant-api.com/v1/weapons`,
      type: 'get',
      success: function(data, jqXHR) {
         console.log("Success!");
         /*for(var count = 0; count < 1000; count++) {
            for(var count2 = 0; count2 < 100; count2++) {
               if(data.data[count].skins[count2].displayName.includes(event)) {
                  console.log("Count 1: " + count + "\nCount 2: " + count2);
                  for(var count3 = 0; count3 < 10; count3++) {
                     if(count == null) {
                        break;
                     }
                  }
               }
               if(count2 == null) {
                  break;
               }
            }
            if(count == null) {
               break;
            }
         }*/

         swatchImage = document.createElement("img");
         swatchImage.className = "swatch";
         swatchImage.src = "icons/swatch.png";


         

         var actualBundleWeapons = document.createElement("div");
         actualBundleWeapons.className = "bundle-weapons";
      
         var bundleWeaponFlex = document.createElement("div");
         bundleWeaponFlex.className = "largeview-bundle-weapon-flex";
      
         var bundleWeaponImage = document.createElement("img");
         bundleWeaponImage.className = "largeview-bundle-weapon-img";
         bundleWeaponImage.setAttribute("id", "BundleWeaponImg");
         bundleWeaponImage.src ="icons/displayicon.png";
      
         var bundleWeaponFlexText = document.createElement("div");
         bundleWeaponFlexText.className = "largeview-bundle-weapon-info";
      
         var flexUl = document.createElement("ul");
         var flexLi1 = document.createElement("li");
         var flexLi1H2 = document.createElement("h2");
         flexLi1H2.className = document.createElement("bundle-weapon-info-gunname");
         flexLi1H2.appendChild(document.createTextNode("RGX 11z Pro Vandal"));
         var flexLi2 = document.createElement("li");
         var flexLi2Button = document.createElement("button");
         flexLi2Button.setAttribute("id", "largeview-bundleweapon-preview");
         flexLi2Button.appendChild(document.createTextNode("Preview Video"));
      
         largeviewBundleName.appendChild(document.createTextNode("Bundle: "));
         largeviewBundleName.appendChild(BundleNameSpan);
      
         bundleinfoFlex.appendChild(bundleImage);
         bundleinfoFlex.appendChild(infoFlexRight);
         infoFlexRight.appendChild(bundleinfoH1);
         infoFlexRight.appendChild(bundleInfoUl);
      
         bundleInfoUl.appendChild(bundleInfoLi1);
         bundleInfoUl.appendChild(bundleInfoLi2);
      
         bundleInfoLi1.appendChild(document.createTextNode("Cost: "));
         bundleInfoLi1.appendChild(bundleInfoLi1Span);
      
         var bundledesc = "-"
      
         bundleInfoLi2.appendChild(document.createTextNode("Extra Description: " + bundledesc));
         bundleInfoLi2.appendChild(bundleInfoLi2Span);
      
         bundleWeapons.appendChild(bundleColorOptions);
         bundleWeapons.appendChild(actualBundleWeapons);
      
         bundleColorOptions.appendChild(swatchImage);
      
         actualBundleWeapons.appendChild(bundleWeaponFlex);
      
         bundleWeaponFlex.appendChild(bundleWeaponImage);
         bundleWeaponFlex.appendChild(bundleWeaponFlexText);
      
         bundleWeaponFlexText.appendChild(flexUl);
      
         flexUl.appendChild(flexLi1);
         flexUl.appendChild(flexLi2);
      
         flexLi1.appendChild(flexLi1H2);
      
         flexLi2.appendChild(flexLi2Button);
      
      
         var cardGrid = document.getElementById("largeview-handler");
         var nextElement = document.getElementById("promo-vid-div");
         cardGrid.insertBefore(bundleWeapons, nextElement);
         cardGrid.insertBefore(hr, bundleWeapons);
         cardGrid.insertBefore(bundleinfoFlex, hr);
         cardGrid.insertBefore(largeviewBundleName, bundleinfoFlex);

         
      },
   });

//----------------------------------------------------------------------------------------------------------------
}