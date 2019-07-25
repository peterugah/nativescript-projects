let LoginModel  = require("./login-model");
let page, viewModel;
let statusBar = require("../shared/funcs").setStatusBar;
let func = require("../shared/funcs");
exports.onLoaded = args=>{
    page  = args.object;
    viewModel = page.bindingContext = LoginModel();
    statusBar("#f44881")

}
exports.signUp = args=>{
    args.object.page.frame.navigate({
        moduleName:"sign-up/sign-up",
        animated : false
    });
}
exports.login = async args=>{
    func.showLoader(viewModel);

    let user = await viewModel.authenticate();
    
    func.hideLoader(viewModel);
    
    let content = JSON.parse(user.content);
    
    if(func.showErrors(content.error , viewModel))return;
    
    func.saveUserDetails(content);
    
    page.frame.navigate("home/home");
}

exports.clearError = ()=>{
    func.clearErrors(viewModel);
}

