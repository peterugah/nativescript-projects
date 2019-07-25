let fs = require("tns-core-modules/file-system");
let image = require("tns-core-modules/ui/image");
let imageResource = require("tns-core-modules/image-source");
let Obs = require("tns-core-modules/data/observable")
    .Observable;
let ImageCropper = require("nativescript-imagecropper").ImageCropper;
let page;
let callBack;
let context;
exports.loaded = args => {
    page = args.object;
    page.bindingContext = new Obs();
    context = page.bindingContext;
}
exports.shownModally = args => {
    callBack = args.closeCallback;
    context.set("busy", true);
    context.set("filePath", args.context._android);
    //load image source
    if (fs.File.exists(context.get("filePath"))) {
        let cropper = new ImageCropper();
        let imgSource = imageResource.fromFile(context.get("filePath"));
        console.log(fs.Folder.);
        cropper.show(imgSource, { width: "100px", height: "100px" })
            .then(res => {
                if (res.image)
                    console.log("yes image exists");
            //     if (res.image) {
            //         let imageView = page.getViewById("imagePreview");
            //          imageView.imageSource = res.image;
            //   }
            });
            
        
        return;
        let image = imageResource.fromFile(context.get("filePath"));
        context.set("busy", false);
        let imagePreview = page.getViewById("imagePreview");
        imagePreview.imageSource = image;

        // let cropper = new ImageCropper();
        // cropper.show(image , {width:30 , height: 30})
        //     .then(args => {
        //          let imageView = page.getViewById("imagePreview");
        // imageView.imageSource = args.image;
        // })
    }
    //append imagesource to iamge

}

exports.uploadImage = () => {
    callBack(context.get("filePath"));
}