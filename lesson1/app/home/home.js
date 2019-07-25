var page;
var Observable = require("tns-core-modules/data/observable").Observable;
exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = new Observable();
    page.bindingContext.set("name", getAllUsers());
}


function getAllUsers() {
    return "peter ugah";
}
exports.nextPage = function (args) {
     var btn = args.object;
     var page = btn.page;
    // var frame = page.frame;
     var theFrame = args.object.page.frame;
    theFrame.navigate({
        moduleName: 'view/view',
        animated: false,
        transition: {
            name: "flipLeft",
            duration: 380,
            curve: "easeIn"
        },
        context: {
            name: page.bindingContext.get("name"),
            occupation: 'student',
            version : 1.0
        }
    })
    

}