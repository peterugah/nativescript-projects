let view = require("tns-core-modules/ui/core/view")
exports.loaded = args => {
    let page = args.object;
    let sidebar = view.getViewById(page, "sideBar");
    console.log("sidebar is " , sidebar)
//    console.log(page.getViewById("sideBar"))
}
