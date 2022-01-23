const colorFS = require('fs');

if(!colorFS.existsSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json')) {
    var dataToWrite = {
        "app_color": "#12171d",
        "app_subcolor_1": "#1b222b",
        "app_subcolor_2": "#242e3a",
        "gradient_left": "#c80043",
        "gradient_right": "#6f00ff",
        "box_shadow": "0 0 2.5px rgba(255, 0, 67, 0.7), 0 0 10px rgba(255, 0, 67, 0.7), 0 0 30px rgba(255, 0, 67, 0.7)",
        "text_shadow": "0 0 5px rgba(255, 0, 67, 0.6), 0 0 20px rgba(255, 0, 67, 0.6), 0 0 60px rgba(255, 0, 67, 0.6)",
        "button_color": "#c80043",
        "button_hover_color": "#ff0055",
        "logo_style": "default",
        "button_color_var": "#ffffff",
        "global_color": "#ffffff",
        "loadCustomTheme": false
    }

    colorFS.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json', JSON.stringify(dataToWrite))
}

let rawColorData = colorFS.readFileSync(process.env.APPDATA + '/VALTracker/user_data/colorTheme.json');
let colorData = JSON.parse(rawColorData);

let root = document.documentElement;

if(colorData.loadCustomTheme == true) {
    let newRawColorData = colorFS.readFileSync(process.env.APPDATA + `/VALTracker/user_data/customThemes/${colorData.customThemeName}.json`);
    let newColorData = JSON.parse(newRawColorData);
    root.style.setProperty('--app-color', newColorData.app_color);
    root.style.setProperty('--app-color-light', newColorData.app_subcolor_1);
    root.style.setProperty('--app-color-lightest', newColorData.app_subcolor_2);
    
    root.style.setProperty('--gradient-left', newColorData.gradient_left);
    root.style.setProperty('--gradient-right', newColorData.gradient_right);
    
    root.style.setProperty('--box-shadow', newColorData.box_shadow);
    root.style.setProperty('--text-shadow', newColorData.text_shadow);
    
    root.style.setProperty('--button-color', newColorData.button_color);
    root.style.setProperty('--button-hover-color', newColorData.button_hover_color);
    root.style.setProperty('--button-color-var', newColorData.button_color_var);
    root.style.setProperty('--global-textcolor', newColorData.global_color);
    
    var logo_top = document.getElementById('valtracker-logo');

    var pathvar = document.location.pathname;
    var path2 = pathvar.substring(pathvar.indexOf('/'), pathvar.lastIndexOf('/'));
    var directoryName = path2.split("/").pop();
    
    var page = pathvar.split("/").pop();
    if(page == "fakeLoadingIndex.html") {
        $('.home-loading-img').attr("src", "./iconss/VALTracker_Logo_default.png")
    }
    
    if(directoryName == "CollectablePages") {
        logo_top.setAttribute("src", `../iconss/VALTracker_Logo_default.ico`);
    } else {
        logo_top.setAttribute("src", `./iconss/VALTracker_Logo_default.ico`);
    }
} else {
    root.style.setProperty('--app-color', colorData.app_color);
    root.style.setProperty('--app-color-light', colorData.app_subcolor_1);
    root.style.setProperty('--app-color-lightest', colorData.app_subcolor_2);
    
    root.style.setProperty('--gradient-left', colorData.gradient_left);
    root.style.setProperty('--gradient-right', colorData.gradient_right);
    
    root.style.setProperty('--box-shadow', colorData.box_shadow);
    root.style.setProperty('--text-shadow', colorData.text_shadow);
    
    root.style.setProperty('--button-color', colorData.button_color);
    root.style.setProperty('--button-hover-color', colorData.button_hover_color);
    root.style.setProperty('--button-color-var', colorData.button_color_var);
    root.style.setProperty('--global-textcolor', colorData.global_color);
    
    var logo_top = document.getElementById('valtracker-logo');
    
    var pathvar = document.location.pathname;
    var path2 = pathvar.substring(pathvar.indexOf('/'), pathvar.lastIndexOf('/'));
    var directoryName = path2.split("/").pop();
    
    var page = pathvar.split("/").pop();
    if(page == "fakeLoadingIndex.html") {
        if(colorData.logo_style == "default" || colorData.logo_style == undefined) {
            $('.home-loading-img').attr("src", "./iconss/VALTracker_Logo_default.png")
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
}