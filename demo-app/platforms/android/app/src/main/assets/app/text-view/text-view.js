exports.textViewLoaded = args => {
    let view = args.object;
    view.focus();
    console.log("text view loaded..");

    view.on("textChange", (arg) => {
        console.dir(arg.oldValue);
        console.log("text is changing")
    });
}
exports.focusEvent = args => {
    console.log("focused on text view");
}
exports.propertyChange = args => {
    console.log("you are typing...");
}
exports.labelLoaded = args => {
    console.log("lable loaded");
}
exports.getUsers = args => {
    let repeater = args.object;
    let users = ['one', 'two', 'three', 'four']
    let page = repeater.page;
    page.bindingContext = {
        users,
    }
}

const Cache = require("tns-core-modules/ui/image-cache").Cache;
const imageSource = require("tns-core-modules/image-source");
exports.pageLoaded = args => {
    let cache = new Cache();
    cache.placeholder = imageSource.fromFile("~/image/photo.png");
    cache.maxRequests = 5;
    cache.enableDownload()
    args.object.bindingContext = {
        imgSrc: cache.placeholder
    }
    const url = "https://avatars1.githubusercontent.com/u/7392261?v=4";
    const image = cache.get(url);
    //const cacheImage;
    if (image) {
        console.log("gotten from cache");
        args.object.bindingContext.imgSrc = image;
    } else {
        cache.push({
            key: url,
            url: url,
            completed: (image, key) => {
                if (key === url) {
                    console.log("fininsed downloading...");
                    args.object.bindingContext = {
                        imgSrc : image
                    }

                }
            }
        })
    }
    cache.disableDownload();
}