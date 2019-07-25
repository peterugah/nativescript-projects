const Obs = require("tns-core-modules/data/observable").Observable;
const http = require("tns-core-modules/http");
const appSettings = require("tns-core-modules/application-settings");
let viewModel = new Obs();

function SignUp() {
    viewModel.set("email", "")
    viewModel.set("password", "")
    viewModel.set("loader", false);
    return viewModel;
}

//methods
viewModel.registerUser = function () {
    return http.request({
        url: appSettings.getString("host") + "/register",
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        content: JSON.stringify({
            email: this.get("email"),
            password: this.get("password")
        })
    }).catch(err => {
        alert("network error");
    });
}
module.exports = SignUp;