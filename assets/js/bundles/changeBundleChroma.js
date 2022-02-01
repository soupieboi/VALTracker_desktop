function changeBundleChroma(id, src) {
    $.ajax({
        url: `https://valorant-api.com/v1/weapons`,
        type: 'get',
        success: function(data, jqXHR) {
            var list = document.getElementsByClassName("largeview-bundle-weapon-img");
            for(var i = 0; i < list.length; i++) {
                sessionStorage.setItem("chroma", chroma);
                //console.log(list[i].id);
                const str = list[i].id;
            
                const slug1 = str.substring(str.indexOf('-') + 1); // 01-2020var x = '/Controller/Action?id=11112&value=4444';
                remove_after = slug1.indexOf('-');
                var result =  slug1.substring(0, remove_after);
                //console.log(result);
                    
                const slug2 = str.split('-').pop(); // 2020
                //console.log(slug2)
                document.getElementById(list[i].id).setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].chromas[id-1].fullRender)
                var chroma = id;
            }
        },
        error: function(jqXHR) {
            createErrorCard(this.url, jqXHR.status);
        }
    })
}