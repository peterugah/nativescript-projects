"strict";
let page, context;
let Observable = require("tns-core-modules/data/observable").Observable;
let webListener;
let webModule = require("nativescript-webview-interface").WebViewInterface;
let webViewModule = require("tns-core-modules/ui/web-view").WebView;
exports.loaded = args => {
    page = args.object;
    context = page.bindingContext = new Observable();
    let webView = page.getViewById("web-view");
    let view = new webViewModule();
    webView.android.getSettings().setBuiltInZoomControls(false);
    webListener = new webModule(webView, "https://7e2962d7.ngrok.io/");

    eventListeners();
}

function eventListeners() {
    // webListener.on("one", data => {
    //     console.log("got data : ", data);
    // })
}

const imageResource = require("tns-core-modules/image-source")
const fs = require("tns-core-modules/file-system");
exports.callWebView = args => {
    let url = "https://d2odgkulk9w7if.cloudfront.net/images/default-source/default-album/garfield-cant-share.png?sfvrsn=984f0ffe_0&MaxWidth=600&MaxHeight=&ScaleUp=false&Quality=High&Method=ResizeFitToAreaArguments&Signature=5117DE7B61D75603957126D2C084D2AFD04AA1A1";
    let i = imageResource.fromUrl(url);

    i
        .then(res => {
            let path = fs.knownFolders.documents().getFolder("downloads").getFile("image.png");
            // if (fs.File.exists(path)) {
            //     let removed = path.removeSync();
            //     console.log("is removed..");
            // }
            let saved = res.saveToFile(path);
            if (saved) {
                console.log("file saved...");
            } else {
                console.log("file not saved....");
            }
        }).catch(err => console.log("error: " , err));


}
exports.fetchImage = args => {
    let folder = fs.knownFolders.documents().getFolder("app-images");
    let exists = fs.Folder.exists(folder.path);
    let url = "https://d2odgkulk9w7if.cloudfront.net/images/default-source/default-album/garfield-cant-share.png?sfvrsn=984f0ffe_0&MaxWidth=600&MaxHeight=&ScaleUp=false&Quality=High&Method=ResizeFitToAreaArguments&Signature=5117DE7B61D75603957126D2C084D2AFD04AA1A1";
    imageResource.fromUrl(url)
        .then(res => {
            let img = fs.path.join(folder.path, "image.png");
            if (fs.File.exists(img))
            {
                let file = folder.getFile("image.png");
                file.removeSync(err => {
                    if (!err)
                        console.log("file removed successfully");
                })
            } 
            let saved = res.saveToFile(img);
            if (saved)
                console.log("image saved..");
            return img;
        })
        .then(image => {
            let imageView = page.getViewById("image");
            webListener.emit("image", {
                url: image,
            });
        })
        .catch(err => console.log(err));
}