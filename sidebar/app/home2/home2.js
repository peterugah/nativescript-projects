let view = require("tns-core-modules/ui/core/view");
let settings = require("tns-core-modules/application-settings");
exports.loaded = args => {
    console.log("this is good.");
}
// exports.onOpenDrawerTap = args => {
//     let page = args.object.page;
//     let sidebar = page.getViewById("sideDrawer");
//     sidebar.toggleDrawerState();
// }
exports.toggleSideDrawer = args => {
    let page = args.object.page;
    let sideDrawer = page.getViewById("sideDrawer");
    sideDrawer.toggleDrawerState();
}
exports.drawerOpened = args => {
    console.log("console");
}
exports.drawerClosed = args => {
    console.log("closed");
}
exports.drawerOpening = args => {
    console.log("opening the drawer");
}
exports.drawerClosing = args => {
    console.log(args.object);
    console.log("drawer closing");
}
exports.closeDrawer = args => {
    let page = args.object.page;
    let drawer = page.getViewById("sideDrawer");
    drawer.closeDrawer();
}