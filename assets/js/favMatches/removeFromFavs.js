function loadRemovePromt(matchID, matchToRemove, matchAgentImg, matchKDA, matchResult) {
    console.log(matchToRemove)
    let matchResultPatched = matchResult.replace("RESULT", "");
    $('.remove-fav-promt-wrapper').css("opacity", "0")
    $('.remove-fav-promt-wrapper').css("display", "flex")
    $('.remove-fav-promt-wrapper').fadeTo(150, 1)
    $('.match-to-delete-agent').attr("src", matchAgentImg)
    $('.match-to-delete-kda').empty()
    $('.match-to-delete-result').empty()
    $('.match-to-delete-result').empty()
    $('.match-to-delete-kda').append(matchKDA)
    $('.match-to-delete-result').append(matchResultPatched)
    $('.delete-favmatch-button').attr("id", matchID)
    setTimeout(function() {
        $('.delete-favmatch-button').css("cursor", "pointer");
    }, 1000)
    $('.deletefav-relative-div-largeview').on("click", function() {
        $('.remove-fav-promt-wrapper').fadeTo(150, 0)
        setTimeout(function() {
            $('.remove-fav-promt-wrapper').css("display", "none")
        }, 200)
    })
    $('.delete-favmatch-button').on("click", function() {
        var checkedPath1 = process.env.APPDATA + '/VALTracker/settings/favourites.json'
        let rawdata = fs.readFileSync(checkedPath1);
        let dataToRead = JSON.parse(rawdata);
        
        for(var count = 0; count < dataToRead.favourites.length; count++) {
            if(dataToRead.favourites[count].MatchID == matchID) {
                delete dataToRead.favourites[count]
            }
        }
        var newArrToPush = {
            "favourites": [{
                
            }]
        };
        for(var count = 0; count < dataToRead.favourites.length; count++) {
            if(dataToRead.favourites[count] == null) {
                continue;
            } else {
                newArrToPush.favourites.push(dataToRead.favourites[count])
            }
        }
        $(matchToRemove).remove()
        fs.writeFileSync(checkedPath1, JSON.stringify(newArrToPush));
    })
}