let page = {};
const Obs = require("tns-core-modules/data/observable").Observable;
let Cache = require("tns-core-modules/ui/image-cache").Cache;
let imgRsc = require("tns-core-modules/image-source");
exports.loaded = args => {
    page.page = args.object;
    page.bindingContext = new Obs();
    let cache = new Cache();
    cache.placeholder = imgRsc.fromFile("~/image/photo.png");
    page.bindingContext.set("imgSrc", cache.placeholder);
    //cache.maxRequests = 5;
    //cache.enableDownload();
    
    //cache.disableDownload();
}

function fetchImage(args) {

}
exports.swipe = args => {
    console.log("swipped me");
}