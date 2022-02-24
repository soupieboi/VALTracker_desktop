function changeBundleChroma(id) {
    $.ajax({
        url: `https://valorant-api.com/v1/weapons`,
        type: 'get',
        success: function(data, jqXHR) {
            var list = document.getElementsByClassName("largeview-bundle-weapon-img");
            for(var i = 0; i < list.length; i++) {
                sessionStorage.setItem("chroma", chroma);
                const str = list[i].id;
            
                const slug1 = str.substring(str.indexOf('-') + 1);
                remove_after = slug1.indexOf('-');
                var result =  slug1.substring(0, remove_after);
                    
                const slug2 = str.split('-').pop();
                document.getElementById(list[i].id).setAttribute("src", data.data[parseInt(slug1)].skins[parseInt(slug2)].chromas[id-1].fullRender)
                var chroma = id;
            }
        },
        error: function(jqXHR) {
            createErrorCard(this.url, jqXHR.status);
        }
    })
}