const uaup = require('uaup-js');
var app_library = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")) + "\\";

const defaultStages = {
    Checking: "Checking For Updates!", // When Checking For Updates.
    Found: "Update Found!",  // If an Update is Found.
    NotFound: "No Update Found.", // If an Update is Not Found.
    Downloading: "Downloading...", // When Downloading Update.
    Unzipping: "Installing...", // When Unzipping the Archive into the Application Directory.
    Cleaning: "Finalizing...", // When Removing Temp Directories and Files (ex: update archive and tmp directory).
    Launch: "Launching..." // When Launching the Application.
};

const updateOptions = {
    gitRepo: "VALTracker_src", // [Required] Your Repo Name
    gitUsername: "SpiritLetsPlays",  // [Required] Your GitHub Username.

    appName: "VALTracker", //[Required] The Name of the app archive and the app folder.
    appExecutableName: "VALTracker.exe", //[Required] The Executable of the Application to be Run after updating.

    progressBar: null, // {Default is null} [Optional] If Using Electron with a HTML Progressbar, use that element here, otherwise ignore
    label: null, // {Default is null} [Optional] If Using Electron, this will be the area where we put status updates using InnerHTML
    stageTitles: defaultStages, // {Default is defaultStages} [Optional] Sets the Status Title for Each Stage
    appDirectory: app_library + this.appName,

    versionFile: this.appDirectory + "/settings/version.json",
    tempDirectory: "/tmp",
};

uaup.Update(updateOptions);