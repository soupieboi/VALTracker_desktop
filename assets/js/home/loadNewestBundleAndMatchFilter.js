$(document).ready(() => {
    let rawdata = fs.readFileSync(process.env.APPDATA + '/VALTracker/settings/home/preferredMatchFilter.json');
    let dataToRead = JSON.parse(rawdata);
    $("#selected-matchtype").val(dataToRead.preferredMatchFilter);
    setTimeout(function() {
        $.ajax({
            dataType: "json",
            url: `https://api.henrikdev.xyz/valorant/v1/store-featured`,
            type: 'get',
            success: function(data, xhr) {
                var bUUID = data.data.FeaturedBundle.Bundle.DataAssetID;
                $('.featured-bundle-img').attr("src", "https://media.valorant-api.com/bundles/" + data.data.FeaturedBundle.Bundle.DataAssetID + "/displayicon2.png");
                $.ajax({
                    dataType: "json",
                    url: `https://valorant-api.com/v1/bundles`,
                    type: 'get',
                    success: function(data2, xhr) {
                        for(var count = 0; count < data2.data.length; count++) {
                            if(data2.data[count].uuid == bUUID) {
                                $('.featured-bundle-title').append(data2.data[count].displayName);
                                var secondsRemaining = data.data.FeaturedBundle.BundleRemainingDurationInSeconds +3
                                function secondsToHms(secondsRemaining) {
                                    n = Number(secondsRemaining);
                                    var d = Math.floor(n / 86400);
                                    var h = Math.floor(n / 3600 / 30);
                                    var m = Math.floor(n % 3600 / 60);
                                    var s = Math.floor(n % 3600 % 60);
                                
                                    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
                                    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
                                    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
                                    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                                    return dDisplay + hDisplay + mDisplay + sDisplay; 
                                }
                                console.log(secondsToHms(secondsRemaining))
                                setInterval(function() {
                                    secondsRemaining--;
                                    $('.featured-bundle-time-left').empty()
                                    $('.featured-bundle-time-left').append(secondsToHms(secondsRemaining -1) + " remaining")
                                }, 1000)
                            }
                        }
                    }
                });
            }
        });
    }, 0)
})