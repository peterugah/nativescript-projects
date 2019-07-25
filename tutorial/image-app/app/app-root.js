let appSettings = require("tns-core-modules/application-settings");
exports.loaded = args => {
    let frame = args.object;
    if (canGoHome)
        frame.defaultPage = "home/home"
    else if (shouldLogIn)
        frame.defaultPage = "login/login"
    else
        frame.defaultPage = "sign-up/sign-up"
}


 const canGoHome =  appSettings.hasKey("registered") &&
                    appSettings.hasKey("loggedIn") &&
                    appSettings.getBoolean("loggedIn") &&
                    appSettings.getBoolean("registered");


let shouldLogIn =   appSettings.hasKey("registered") &&
                    appSettings.hasKey("loggedIn") &&
                    appSettings.getBoolean("registered") &&
                    !appSettings.getBoolean("loggedIn");