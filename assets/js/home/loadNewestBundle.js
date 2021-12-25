$(document).ready(() => {
    setTimeout(function() {
        $.ajax({
            dataType: "json",
            url: `https://api.henrikdev.xyz/valorant/v1/store-featured`,
            type: 'get',
            success: function(data, xhr) {
                $('.featured-bundle-img').attr("src", "https://media.valorant-api.com/bundles/" + data.data.FeaturedBundle.Bundle.DataAssetID + "/displayicon2.png");
                sessionStorage.setItem("bundle_uuid", data.data.FeaturedBundle.Bundle.DataAssetID)
            }
        });
    }, 0)
})