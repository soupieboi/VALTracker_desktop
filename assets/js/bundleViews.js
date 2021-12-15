function shiftBundleView(event, imageid, bundledescmonke) {
   var leaveShift = 1.05;
   var hiddenShift = 0.9;
   var endShift = 1;
   $('body').css('overflow', 'hidden');
   $('.app').css('transform', 'scale(' + leaveShift + ')');
   $('.bundle-largeview').css('transform', 'scale(' + hiddenShift + ')');
   $('.app').fadeTo(200, 0);
   $('.header-relative-div-largeview').fadeTo(100, 1);
   $(".bundle-largeview").css({display: "block"});
   
   setTimeout(function() {
      $('.app').css('display', 'none');
      $(".bundle-largeview").css({display: "block"});
      $('.bundle-largeview').css('transform', 'scale(' + endShift + ')');
      $('body').css('border-bottom', 'none');
      $('.bundle-largeview').css('opacity', '1');
   }, 500)

   //------------------------------------ CREATING ELEMENT --------------------------------------------------------
         
   var largeviewBundleName = document.createElement("h1");
   largeviewBundleName.classList.add("largeview-bundlename");
   var BundleNameSpan = document.createElement("span");
   BundleNameSpan.classList.add("largeview-bundlename-span");
   BundleNameSpan.setAttribute("id", "largeviewBundlenameSpan");
   BundleNameSpan.appendChild(document.createTextNode(event));

   var bundleinfoFlex = document.createElement("div");
   bundleinfoFlex.className = "largeview-bundleinfo-flex";

   var bundleImage = document.createElement("img");
   bundleImage.setAttribute("draggable", `false`);
   bundleImage.className = "largeview-bundleimage";
   var string = imageid;
   var newstring = string.replace(/displayicon2.png/, 'verticalpromoimage.png');
   var request;
   if(window.XMLHttpRequest)
      request = new XMLHttpRequest();
   else
      request = new ActiveXObject("Microsoft.XMLHTTP");
   request.open('GET', newstring, false);
   request.send(); // there will be a 'pause' here until the response to come.
   // the object request will be actually modified
   if(request.status === 404) {
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
         for(var count = 0; count < data.data.length; count++) {
            for(var count2 = 0; count2 < data.data[count].skins.length; count2++) {
               if(
                  event == "Glitchpop" && data.data[count].skins[count2].themeUuid == "3737b313-45e6-4760-017f-60bc18c765dd"
                  || event == "Magepunk" && data.data[count].skins[count2].themeUuid == "df7fbc2f-4801-df74-7c08-0bb09ce3904c"
                  || event == "Prime" && data.data[count].skins[count2].themeUuid == "3264e5b6-4bd2-213b-eeab-4d8525dd4ffb"
                  || event == "Prism" && data.data[count].skins[count2].themeUuid == "0c2487bb-4cf9-78be-1bf1-c696f86b4aab" 
                  || event == "Prism" && data.data[count].skins[count2].themeUuid == "b7ce48c8-412e-b318-8f8d-f88893db886a" 
                  || event == "Prism" && data.data[count].skins[count2].displayName == "Prism III Axe" 
                  || event == "Prism II" && data.data[count].skins[count2].themeUuid == "0c2487bb-4cf9-78be-1bf1-c696f86b4aab"
                  || event == "Prism II" && data.data[count].skins[count2].displayName == "Prism III Axe" 
               ) {
                  break;
               }
               if(
                  data.data[count].skins[count2].displayName.includes(event) 
                  || event == "Spectrum" && data.data[count].skins[count2].displayName == "Waveform" 
                  || event == "VALORANT GO! Vol. 2" && data.data[count].skins[count2].displayName == "Yoru's Stylish Butterfly Comb" 
                  || event == "Ruination" && data.data[count].skins[count2].displayName == "Broken Blade of the Ruined King" 
                  || event == "Sentinels of Light" && data.data[count].skins[count2].displayName == "Relic of the Sentinel" 
                  || event == "Nunca Olvidados" && data.data[count].skins[count2].displayName == "Catrina"
                  || event == "Tethered Realms" && data.data[count].skins[count2].displayName == "Prosperity"
                  || event == "Glitchpop 2.0" && data.data[count].skins[count2].themeUuid == "3737b313-45e6-4760-017f-60bc18c765dd"
                  || event == "Magepunk 2.0" && data.data[count].skins[count2].themeUuid == "df7fbc2f-4801-df74-7c08-0bb09ce3904c"
               ) {
                  for(var count3 = 0; count3 < data.data[0].skins[0].chromas.length; count3++) {

                     var actualBundleWeapons = document.createElement("div");
                     actualBundleWeapons.className = "bundle-weapons";

                     var bundleWeaponFlex = document.createElement("div");
                     bundleWeaponFlex.className = `largeview-bundle-weapon-flex`;
      
                     var bundleWeaponImage = document.createElement("img");
                     bundleWeaponImage.className = "largeview-bundle-weapon-img";
                     bundleWeaponImage.setAttribute("id", `BundleWeaponImg-${count}-${count2}`);
                     bundleWeaponImage.setAttribute("draggable", `false`);

                     bundleWeaponImage.src = data.data[count].skins[count2].chromas[0].fullRender;

                     var bundleWeaponFlexText = document.createElement("div");
                     bundleWeaponFlexText.className = "largeview-bundle-weapon-info";
                  
                     var flexUl = document.createElement("ul");
                     var flexLi1 = document.createElement("li");
                     var flexLi1H2 = document.createElement("h2");
                     flexLi1H2.className = document.createElement("bundle-weapon-info-gunname");
                     flexLi1H2.appendChild(document.createTextNode(data.data[count].skins[count2].displayName));

                     var flexLi2 = document.createElement("li");
                     var flexLi2Button = document.createElement("button");
                     flexLi2Button.setAttribute("id", "largeview-bundleweapon-preview");
                     flexLi2Button.setAttribute("onclick", "showPromoVid(this.parentElement.lastChild)");
                     flexLi2Button.appendChild(document.createTextNode("Preview Video"));

                     var flexLi2HiddenSpan = document.createElement("span");
                     flexLi2HiddenSpan.setAttribute("id", "largeview-bundleweapon-preview-link-hidden");
                     flexLi2HiddenSpan.appendChild(document.createTextNode("Preview Video"));

      
                     actualBundleWeapons.appendChild(bundleWeaponFlex);
                  
                     bundleWeaponFlex.appendChild(bundleWeaponImage);
                     bundleWeaponFlex.appendChild(bundleWeaponFlexText);
                  
                     bundleWeaponFlexText.appendChild(flexUl);
                  
                     flexUl.appendChild(flexLi1);
                     flexUl.appendChild(flexLi2);
                  
                     flexLi1.appendChild(flexLi1H2);
                  
                     flexLi2.appendChild(flexLi2Button);
                     flexLi2.appendChild(flexLi2HiddenSpan);
                  
                     bundleinfoFlex.appendChild(bundleImage);
                     bundleinfoFlex.appendChild(infoFlexRight);
                     infoFlexRight.appendChild(bundleinfoH1);
                     infoFlexRight.appendChild(bundleInfoUl);
                  
                     bundleInfoUl.appendChild(bundleInfoLi1);
                     bundleInfoUl.appendChild(bundleInfoLi2);
                  
                     bundleWeapons.appendChild(bundleColorOptions);
                     bundleWeapons.appendChild(actualBundleWeapons);
            
                     break;
                  }
               }
            }
         }
                     
         var bundledesc;

         if(bundledescmonke == "null") {
            bundledesc = "-";
         } else {
            bundledesc = bundledescmonke;
         }
                  
         bundleInfoLi1.appendChild(document.createTextNode("Cost: "));
         bundleInfoLi1.appendChild(bundleInfoLi1Span);
                  
         bundleInfoLi2.appendChild(document.createTextNode("Extra Description: " + bundledesc));
         bundleInfoLi2.appendChild(bundleInfoLi2Span);
                  
         largeviewBundleName.appendChild(document.createTextNode("Bundle: "));
         largeviewBundleName.appendChild(BundleNameSpan);

         var i = 0;
         var i2 = 0;

         for(var count = 0; count < data.data.length; count++) {
            for(var count2 = 0; count2 < data.data[count].skins.length; count2++) {
               if(
                  event == "Glitchpop" && data.data[count].skins[count2].themeUuid == "3737b313-45e6-4760-017f-60bc18c765dd"
                  || event == "Magepunk" && data.data[count].skins[count2].themeUuid == "df7fbc2f-4801-df74-7c08-0bb09ce3904c"
                  || event == "Prime" && data.data[count].skins[count2].themeUuid == "3264e5b6-4bd2-213b-eeab-4d8525dd4ffb"
                  || event == "Prism" && data.data[count].skins[count2].themeUuid == "0c2487bb-4cf9-78be-1bf1-c696f86b4aab" 
                  || event == "Prism" && data.data[count].skins[count2].themeUuid == "b7ce48c8-412e-b318-8f8d-f88893db886a" 
                  || event == "Prism" && data.data[count].skins[count2].displayName == "Prism III Axe" 
                  || event == "Prism II" && data.data[count].skins[count2].themeUuid == "0c2487bb-4cf9-78be-1bf1-c696f86b4aab"
                  || event == "Prism II" && data.data[count].skins[count2].displayName == "Prism III Axe" 
               ) {
                  break;
               }
               if(
                  data.data[count].skins[count2].displayName.includes(event) 
                  || event == "Spectrum" && data.data[count].skins[count2].displayName == "Waveform" 
                  || event == "VALORANT GO! Vol. 2" && data.data[count].skins[count2].displayName == "Yoru's Stylish Butterfly Comb" 
                  || event == "Ruination" && data.data[count].skins[count2].displayName == "Broken Blade of the Ruined King" 
                  || event == "Sentinels of Light" && data.data[count].skins[count2].displayName == "Relic of the Sentinel" 
                  || event == "Nunca Olvidados" && data.data[count].skins[count2].displayName == "Catrina"
                  || event == "Tethered Realms" && data.data[count].skins[count2].displayName == "Prosperity"
                  || event == "Glitchpop 2.0" && data.data[count].skins[count2].themeUuid == "3737b313-45e6-4760-017f-60bc18c765dd"
                  || event == "Magepunk 2.0" && data.data[count].skins[count2].themeUuid == "df7fbc2f-4801-df74-7c08-0bb09ce3904c"
               ) {
                  for(var count3 = 0; count3 < data.data[count].skins[count2].chromas.length; count3++) {
                     if(data.data[count].skins[count2].chromas[count3].swatch) {

                        i = data.data[count].skins[count2].chromas.length;
                        i2++;
                        if (i2 > i) {
                           break;
                        }

                        swatchImage = document.createElement("img");
                        swatchImage.className = "swatch";
                        swatchImage.setAttribute("id", i2)
                        swatchImage.setAttribute("onclick", "changeBundleChroma(this.id, this.src)");
                        swatchImage.src = data.data[count].skins[count2].chromas[i2-1].swatch;
                        swatchImage.setAttribute("draggable", `false`);
                                 
                        bundleColorOptions.appendChild(swatchImage);
                        break;

                     } else {
                        break;
                     }
                  }
               }
            }
         }
                  
                  
         var cardGrid = document.getElementById("largeview-handler");
         var nextElement = document.getElementById("promo-vid-div");
         cardGrid.insertBefore(bundleWeapons, nextElement);
         cardGrid.insertBefore(hr, bundleWeapons);
         cardGrid.insertBefore(bundleColorOptions, hr);
         cardGrid.insertBefore(bundleinfoFlex, bundleColorOptions);
         cardGrid.insertBefore(largeviewBundleName, bundleinfoFlex);
         
      },
   });

//----------------------------------------------------------------------------------------------------------------
}