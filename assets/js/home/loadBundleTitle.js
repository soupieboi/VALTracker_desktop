$(document).ready(() => {
    setTimeout(function() {
        $.ajax({
            dataType: "json",
            url: `https://valorant-api.com/v1/bundles`,
            type: 'get',
            success: function(data2, xhr) {
                for(var count = 0; count < data2.data.length; count++) {
                    if(data2.data[count].uuid == sessionStorage.getItem("bundle_uuid")) {
                        $('.featured-bundle-title').append(data2.data[count].displayName);
                    }
                }
            }
        });
    }, 850)
})