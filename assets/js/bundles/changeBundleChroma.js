function changeBundleChroma(id, bundleID) {
    $.ajax({
        url: `https://api.valtracker.gg/bundles/${bundleID}`,
        type: 'get',
        success: function (data, jqXHR) {
            var list = document.getElementsByClassName("largeview-bundle-weapon-img");
            for (var i = 0; i < list.length; i++) {

                list[i].setAttribute("src", data.data.weapons[i].chromas[id].fullRender)
                var chroma = id;
                sessionStorage.setItem("chroma", chroma);
            }
        },
        error: function (jqXHR) {
            createErrorCard(this.url, jqXHR.status);
        }
    })
}