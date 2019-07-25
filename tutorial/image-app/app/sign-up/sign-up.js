let ViewModel = require("./sign-up-model")
let page, viewModel;
let statusBar = require("../shared/funcs").setStatusBar;
let showError = require("../shared/funcs").showErrors;
let validate = require("../shared/funcs").validateFields;
let saveUserDetails = require("../shared/funcs").saveUserDetails;
let showLoader = require("../shared/funcs").showLoader;
let hideLoader = require("../shared/funcs").hideLoader;
let clearErrors = require("../shared/funcs").clearErrors;
exports.loaded = args => {
    page = args.object;
    page.bindingContext = new ViewModel();
    viewModel = page.bindingContext;
    statusBar("#8b60ed")
}
exports.register = async args => {

    let errors = validate(viewModel);

    if (showError(errors, viewModel)) return;

    showLoader(viewModel);

    let user = await viewModel.registerUser();

    hideLoader(viewModel)

    let content = JSON.parse(user.content);

    if (showError(content.error, viewModel)) return;

    saveUserDetails(content);

    page.frame.navigate({
        moduleName: 'home/home',
        clearHistory: true
    })
}
exports.logIn = args => {
    args.object.page.frame.navigate({
        moduleName: "login/login",
        animated: false
    });
}

exports.clearError = () => {
    clearErrors(viewModel);
}