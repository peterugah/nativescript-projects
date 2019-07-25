let appSettings = require("tns-core-modules/application-settings");

exports.saveUserDetails = function(content)
{
    appSettings.setString("id" , content._id);
    appSettings.setString("email" , content.email);
    appSettings.setBoolean("loggedIn" , true);
    appSettings.setBoolean("registered" , true);
}

exports.showErrors = function (errors = [] ,viewModel) {
    if (errors.length > 0) {
        viewModel.set("errors", errors);
        return true;
    }
    return false;
}
exports.validateFields = function (viewModel) {
    let errors = [];
    if (viewModel.get("email").length < 10) {
        errors.push("please enter an email address")
    } else if (viewModel.get("password").length < 4) {
        errors.push("please enter a password")
    }
    return errors;
}

exports.setStatusBar = function(color)
{
    let StatusBar = require("nativescript-statusbar").StatusBar;
    let bar = new StatusBar()
    bar.updateBarColor(color);
}

exports.showLoader = function(viewModel)
{
    viewModel.set("loader" , true);
}
exports.hideLoader = function(viewModel){
    viewModel.set("loader" , false);
}

exports.clearErrors = function(viewModel)
{
    viewModel.set("errors" ,"");
}

