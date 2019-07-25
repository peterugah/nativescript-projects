const Obs = require("tns-core-modules/data/observable").Observable;
const http = require("tns-core-modules/http");
const appSettings = require("tns-core-modules/application-settings");
let viewModel = new Obs();


function LoginModel() {
    viewModel.set("email", "");
    viewModel.set("password", "");
    viewModel.set("loader", false);
    return viewModel;
}

viewModel.authenticate = function(){
    return http.request({
        url: appSettings.getString("host") + "/authenticate",
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        content: JSON.stringify({
            email: viewModel.get("email"),
            password: viewModel.get("password")
        }),
    }).catch(err=>alert("network error"))
}

module.exports = LoginModel;