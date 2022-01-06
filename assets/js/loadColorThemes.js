const colorFS = require('fs')
const { BrowserWindow } = require('electron').remote

if(!fs.existsSync(process.env.APPDATA + '/VALTracker/settings/colorTheme.json')) {
    var dataToWrite = {
        "gradient_left": "#c80043",
        "gradient_right": "#6f00ff",
        "box_shadow": "0 0 2.5px rgba(255, 0, 67, 0.7), 0 0 10px rgba(255, 0, 67, 0.7), 0 0 30px rgba(255, 0, 67, 0.7)",
        "text_shadow": "0 0 5px rgba(255, 0, 67, 0.6), 0 0 20px rgba(255, 0, 67, 0.6), 0 0 60px rgba(255, 0, 67, 0.6)",
        "button_color": "#c80043",
        "button_hover_color": "#ff0055",
        "logo_style": "default",
        "button_color_var": "#fff"
    }
    console.log(dataToWrite)

    fs.writeFileSync(process.env.APPDATA + '/VALTracker/settings/colorTheme.json', JSON.stringify(dataToWrite))
}

let rawColorData = colorFS.readFileSync(process.env.APPDATA + '/VALTracker/settings/colorTheme.json');
let colorData = JSON.parse(rawColorData);

let root = document.documentElement;

root.style.setProperty('--gradient-left', colorData.gradient_left);
root.style.setProperty('--gradient-right', colorData.gradient_right);

root.style.setProperty('--box-shadow', colorData.box_shadow);
root.style.setProperty('--text-shadow', colorData.text_shadow);

root.style.setProperty('--button-color', colorData.button_color);
root.style.setProperty('--button-hover-color', colorData.button_hover_color);
root.style.setProperty('--button-color-var', colorData.button_color_var);

var logo_top = document.getElementById('valtracker-logo');

var pathvar = document.location.pathname;
var path2 = pathvar.substring(pathvar.indexOf('/'), pathvar.lastIndexOf('/'));
var directoryName = path2.split("/").pop();

var page = pathvar.split("/").pop();
if(page == "fakeLoadingIndex.html") {
    if(colorData.logo_style == "default" || colorData.logo_style == undefined) {
        $('.home-loading-img').attr("src", "./iconss/VALTracker_Logo.png")
    } else {
        $('.home-loading-img').attr("id", "custom-img")
        $('.home-loading-img').attr("src", `./iconss/VALTracker_Logo_${colorData.logo_style}.png`)
    }
}

if(directoryName == "CollectablePages") {
    logo_top.setAttribute("src", `../iconss/VALTracker_Logo_${colorData.logo_style}.ico`);
} else {
    logo_top.setAttribute("src", `./iconss/VALTracker_Logo_${colorData.logo_style}.ico`);
}