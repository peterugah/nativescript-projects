let Obs = require("tns-core-modules/data/observable").Observable;
let viewModel = new Obs();
var imagepicker = require("nativescript-imagepicker");

function UploadModel() {
    viewModel.set("loader", false);
    viewModel.set("description", "")
    viewModel.set("totalBytes", "")
    viewModel.set("currentBytes", "")
    return viewModel;
}
viewModel.validateBeforeCreate = function () {
    if (!this.get("imagePath")) return false;
    if (this.get("description").length < 3) return false;
    return true;
}
module.exports = UploadModel;