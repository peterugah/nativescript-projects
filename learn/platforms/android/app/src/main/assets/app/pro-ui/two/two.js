const model = require("tns-core-modules/data/observable").Observable;
const ObsArr = require("tns-core-modules/data/observable-array").ObservableArray;
exports.loaded = args => {
    let page = args.object;
    page.bindingContext = new model();
    let items = new ObsArr();
    for (let i = 0; i < 20; i++) {
        items.push(new Date().getFullYear() + ` ${i+1}`)
    }
    page.bindingContext.set("dataItems", items);
}
exports.pullToRefreshInitiated = args => {
    let page = args.object.page;
    let dataItems = page.bindingContext.dataItems;
    let len = dataItems.length;
    for (i = len; i < len + 2; i++) {
        dataItems.unshift(new Date().getFullYear() + ` ${i + 1}`);
    }
    args.object.notifyPullToRefreshFinished();
}