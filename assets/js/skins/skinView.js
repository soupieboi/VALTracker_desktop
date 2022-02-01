var lastPage = sessionStorage.getItem("last_page");
$('#backToLastPage').on("click", function() {
    window.location.href = lastPage
})

$.ajax({
    url: `https://valorant-api.com/v1/weapons/skins/${sessionStorage.getItem("skinID")}`,
    type: 'get',
    success: function(data, jqXHR) {
        $('#pageheader').append(data.data.displayName);
        
        if(data.data.displayName == "Luxe Knife") {
            $('.weapon-image').attr("src", data.data.chromas[0].fullRender);
        } else {
            if(!data.data.levels[0].displayIcon) {
                $('.weapon-image').attr("src", data.data.chromas[0].fullRender);
            } else {
                $('.weapon-image').attr("src", data.data.levels[0].displayIcon);
            }
        }

        var total_radianite = -1;
        for(var count = data.data.levels.length; count > 0; count--) {
            total_radianite++;
            var li_handler = document.createElement('li')
            if(count == 1) {
                li_handler.classList.add('level-options-li', 'active-option')
            } else {
                li_handler.className = "level-options-li"
            }
            li_handler.id = count-1;

            li_handler.appendChild(document.createTextNode(`Level ${count}`))
            var wrapper = document.getElementById('levels-wrapper')
            var lastelement = document.getElementById('last-element')
            wrapper.insertBefore(li_handler, lastelement)
        }
        if(total_radianite == 0) {
            $('#skin-radprice').append("0")
        } else {
            $('#skin-radprice').append(total_radianite + "0")
        }

        for(var count = 0; count < data.data.chromas.length; count++) {
            var swatch_img = document.createElement('img')
            swatch_img.className = "singleview-swatch"
            swatch_img.id = `swatch-${count}`
            if(data.data.chromas[count].swatch == null) {
                $('.singleview-colors').css("display", "none")
                continue;
            }
            swatch_img.src = data.data.chromas[count].swatch

            var wrapper = document.getElementById('swatch-handler')
            var lastelement = document.getElementById('last-swatch')
            wrapper.insertBefore(swatch_img, lastelement)
        }

        $.ajax({
            url: `https://api.henrikdev.xyz/valorant/v1/store-offers`,
            type: 'get',
            success: function(data2, jqXHR) {
                for(var count = 0; count < data2.data.Offers.length; count++) {
                    if(data2.data.Offers[count].Rewards[0].ItemID == data.data.levels[0].uuid) {
                        $('#skin-vpprice').append(data2.data.Offers[count].Cost[Object.keys(data2.data.Offers[count].Cost)[0]])
                    }
                }

                if($('#skin-vpprice').text() == "") {
                    $('#skin-vpprice').append("-")
                    $('#skin-vpprice').addClass("disabled")
                }

                $('.level-options-li').on("click", function() {
                    $('.active-option').removeClass("active-option")
                    $(this).addClass("active-option")
                    if(this.id < data.data.levels.length-1) {
                        $('.swatch-active').removeClass("swatch-active")
                    } else if(this.id == data.data.levels.length-1) {
                        $('#swatch-0').addClass("swatch-active")
                    }
                    var i = this.id
                    while(data.data.levels[i].displayIcon == null) {
                        i--;
                    }
                    $('.weapon-image').attr("src", data.data.levels[i].displayIcon);
                })
        
                $('.singleview-swatch').on("click", function() {
                    if($('.active-option').attr("id") !== data.data.levels.length-1) {
                        $('.active-option').removeClass("active-option")
                        $(`#${data.data.levels.length-1}`).addClass("active-option")
                    }
                    $('.swatch-active').removeClass("swatch-active")
                    $(this).addClass("swatch-active")
                    var str = this.id
                    var newStr = str.split('-').pop()
                    if(data.data.chromas[newStr].displayIcon == null) {
                        $('.weapon-image').attr("src", data.data.chromas[newStr].fullRender);
                    } else {
                        $('.weapon-image').attr("src", data.data.chromas[newStr].displayIcon);
                    }
                })
            },
            error: function(jqXHR) {
                createErrorCard(this.url, jqXHR.status);
            }
        });
    },
    error: function(jqXHR) {
        createErrorCard(this.url, jqXHR.status);
    }
})