function changeBundleChroma(id, src) {
    $.ajax({
        url: `https://valorant-api.com/v1/weapons`,
        type: 'get',
        success: function(data, jqXHR) {
            var list = document.getElementsByClassName("largeview-bundle-weapon-img");
            for(var i = 0; i < list.length; i++) {
                console.log(list[i].id);
                const str = list[i].id;
            
                const slug1 = str.substring(str.indexOf('-') + 1); // 01-2020var x = '/Controller/Action?id=11112&value=4444';
                remove_after = slug1.indexOf('-');
                var result =  slug1.substring(0, remove_after);
                console.log(result);
                    
                const slug2 = str.split('-').pop(); // 2020
                console.log(slug2)
                document.getElementById(list[i].id).setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].chromas[id-1].fullRender)
            }
        }
    })
    
}



function changeBundleChroma2(id_el) {
    var list = document.getElementsByClassName("largeview-bundle-weapon-img");
    for(var i = 0; i < list.length; i++) {
        var element = list[i].id;
        console.log(list[i].id)
        var event = document.getElementById("largeviewBundlenameSpan").textContent;
        $.ajax({
            url: `https://valorant-api.com/v1/weapons`,
            type: 'get',
            success: function(data, jqXHR) {
               for(var count = 0; count < data.data.length; count++) {
                  for(var count2 = 0; count2 < data.data[count].skins.length; count2++) {
                     if(data.data[count].skins[count2].displayName.includes(event)) {
                        for(var count3 = 0; count3 < data.data[0].skins[0].chromas.length; count3++) {
                            console.log("test")
                            document.getElementById("BundleWeaponImg-17").setAttribute("src", data.data[count].skins[count2].chromas[1].fullRender)
                        }
                     }
                  }
               }
            }
        })
    }
}