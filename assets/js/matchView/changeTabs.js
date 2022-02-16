function sortTableWithFBs() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("scoreboard-table");
    console.log(table)
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 2; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[4];
            console.log(rows[i].getElementsByTagName("TD"))
            y = rows[i + 1].getElementsByTagName("TD")[4];
            if (x.textContent.toLowerCase() < y.textContent.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function sortTableWithKD() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("scoreboard-table");
    console.log(table)
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 2; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x1 = rows[i].getElementsByTagName("TD")[2];
            y1 = rows[i + 1].getElementsByTagName("TD")[2];
            x = x1.textContent.split("/")[0] - x1.textContent.split("/")[1]
            y = y1.textContent.split("/")[0] - y1.textContent.split("/")[1]
            if (x < y) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function sortTableWithPlntsDefs() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("scoreboard-table");
    console.log(table)
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 2; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x1 = rows[i].getElementsByTagName("TD")[3];
            y1 = rows[i + 1].getElementsByTagName("TD")[3];
            x = x1.textContent.split("/")[0] + x1.textContent.split("/")[1]
            y = y1.textContent.split("/")[0] + y1.textContent.split("/")[1]
            if (x < y) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function sortTableWithDmg() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("scoreboard-table");
    console.log(table)
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 2; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[5];
            console.log(rows[i].getElementsByTagName("TD"))
            y = rows[i + 1].getElementsByTagName("TD")[5];
            if (parseInt(x.textContent) < parseInt(y.textContent)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
$(document).ready(() => {
    var firstLoad = true;
    $('#match-scoreboard').on("click", function() {
        $('.matchview-wrapper-1').fadeTo(400, 0);
        $('#player-overview').toggleClass("active");
        $('#match-scoreboard').toggleClass("active");
        if(firstLoad == true) {
            sortTableWithKD();
            firstLoad = false;
        }
        setTimeout(function() {
            $('.matchview-wrapper-1').css("display", "none");
            $('.matchview-wrapper-2').css("opacity", "0");
            $('.matchview-wrapper-2').css("display", "block");
            $('.matchview-wrapper-2').fadeTo(400, 1);
        }, 400)
    });
    $('#player-overview').on("click", function() {
        $('.matchview-wrapper-2').fadeTo(400, 0);
        $('#player-overview').toggleClass("active");
        $('#match-scoreboard').toggleClass("active");
        setTimeout(function() {
            $('.matchview-wrapper-2').css("display", "none");
            $('.matchview-wrapper-1').css("opacity", "0");
            $('.matchview-wrapper-1').css("display", "block");
            $('.matchview-wrapper-1').fadeTo(400, 1);
        }, 400)
    });
    $('#kda').on("click", function() {
        $('#kda').addClass("active");
        $('#plnts-def').removeClass("active");
        $('#fbs').removeClass("active");
        $('#dmg').removeClass("active");
        sortTableWithKD();
    });
    $('#plnts-def').on("click", function() {
        $('#kda').removeClass("active");
        $('#plnts-def').addClass("active");
        $('#fbs').removeClass("active");
        $('#dmg').removeClass("active");
        sortTableWithPlntsDefs();
    });
    $('#fbs').on("click", function() {
        $('#kda').removeClass("active");
        $('#plnts-def').removeClass("active");
        $('#fbs').addClass("active");
        $('#dmg').removeClass("active");
        sortTableWithFBs();
    });
    $('#dmg').on("click", function() {
        $('#kda').removeClass("active");
        $('#plnts-def').removeClass("active");
        $('#fbs').removeClass("active");
        $('#dmg').addClass("active");
        sortTableWithDmg();
    });
})