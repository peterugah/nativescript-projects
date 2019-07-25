exports.loaded = args => {
    console.log("Welcome");
}
exports.toggle = args => {
    let page = args.object.page;
    let sidebar = page.getViewById("sideDrawer");
    sidebar.showDrawer()
}