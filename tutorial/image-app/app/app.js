/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
const application = require("tns-core-modules/application");
const settings = require("tns-core-modules/application-settings");
settings.setString("host" , "http://10.0.2.2:3000")
settings.setString("logo" , "~/image/camera.svg");
application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
