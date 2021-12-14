function shiftBundleView(event, image) {
   console.log("Monke");
   console.log(event);
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
   text = document.getElementById(image).src.substring(0, document.getElementById(image).src.lastIndexOf('/'));
   console.log(document.getElementById(image).src)
   
   //------------------------------------ CREATING ELEMENT --------------------------------------------------------
         
   var largeviewBundleName = document.createElement("h1");
   largeviewBundleName.classList.add("largeview-bundlename");
   var BundleNameSpan = document.createElement("span");
   BundleNameSpan.classList.add("largeview-bundlename-span");
   BundleNameSpan.appendChild(document.createTextNode("RGX 11z Pro"));

   var bundleinfoFlex = document.createElement("div");
   bundleinfoFlex.className = "largeview-bundleinfo-flex";

   var bundleImage = document.createElement("img");
   bundleImage.className = "largeview-bundleimage";
   bundleImage.src = "icons/displayicon2.png"

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
   var bundleColorh1 = document.createElement("h1");

   var swatchImage = document.createElement("img");
   swatchImage.className = "swatch";
   swatchImage.src = "icons/swatch.png";

   var actualBundleWeapons = document.createElement("div");
   actualBundleWeapons.className = "bundle-weapons";

   var bundleWeaponFlex = document.createElement("div");
   bundleWeaponFlex.className = "largeview-bundle-weapon-flex";

   var bundleWeaponImage = document.createElement("img");
   bundleWeaponImage.className = "largeview-bundle-weapon-img";
   bundleWeaponImage.setAttribute("id", "BundleWeaponImg");
   bundleWeaponImage.src ="icons/displayicon.png"

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

   bundleColorOptions.appendChild(bundleColorh1);
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

//----------------------------------------------------------------------------------------------------------------
}

var ApiCall_BundleTitle;
var ApiCall_ImageSource;

function makeCallAndBuildLargeView() {
   
   

   $.ajax({
      url: `https://valorant-api.com/v1/weapons`,
      type: 'get',
      success: function(data, jqXHR) {
         var count;
         var count2;
         for(var count = 0; count < 20; count++) {
            for(var count2 = 0; count2 < 100000; count2++) {
               if(count == undefined) {
                  break;
               }
            }

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
   makeCallAndBuildLargeView();
});