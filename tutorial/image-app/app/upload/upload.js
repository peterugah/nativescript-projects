const bghttp = require("nativescript-background-http");
const appSettings = require("tns-core-modules/application-settings");
let page, viewModel;
let UploadModel = require("./upload-model");
let func = require("../shared/funcs");
let statusBar = require("../shared/funcs").setStatusBar;
var imagepicker = require("nativescript-imagepicker");



exports.selectImage = args => {
     selectSingleImage()
     .then(img=>{
         previewImage("img" , img);
     })
};

exports.navigatedFrom = args => {
    previewImage("img", "");
};
exports.loaded = args => {
    page = args.object;
    viewModel = new UploadModel();
    page.bindingContext = viewModel;
    statusBar("#4d545d");
};

exports.focus = args => {
    args.object.focus();
};

exports.upload = () => {
    if (!viewModel.validateBeforeCreate()) return;
    func.showLoader(viewModel);
    let task = uploadContent();
    task.on("progress", e => {
        viewModel.set("totalBytes", e.totalBytes);
        viewModel.set("currentBytes", e.currentBytes);
    });

    task.on("complete", e => {
        func.hideLoader(viewModel);
        page.frame.navigate("home/home");
    });

    task.on("error", e => {
        func.hideLoader(viewModel);
        alert("could not uplod the image");
        //show what the error is to the user
        console.log("error");
    });
};

exports.goHome = () => {
    page.frame.navigate({
        moduleName: "home/home",
        transition: {
            name: "slideLeft"
        }
    });
};

//functions
function previewImage(imageId, img) {
    let imgView = page.getViewById(imageId);
    imgView.src = img;
}

function uploadContent() {
    let image = viewModel.get("imagePath");
    let description = viewModel.get("description");
    let id = appSettings.getString("id");
    params = [{
            name: "description",
            value: description
        },
        {
            name: "id",
            value: id
        },
        {
            name: "image",
            filename: image
        }
    ];
    let session = bghttp.session("upload-image");
    let task = session.multipartUpload(params, {
        url: appSettings.getString("host") + "/upload",
        method: "POST",
        headers: {
            "Content-Type": "application/octet-stream"
        }
    });
    return task;
}

function selectSingleImage() {
    return new Promise((resolve, reject) => {
            let context = imagepicker.create({
                mode: "single"
            });
            context
                .authorize()
                .then(() => context.present())
                .then(selection => {
                    let image = selection.pop();
                    //set the path to be used later
                    console.log(image);
                    viewModel.set("imagePath", image._android);
                    image.getImageAsync((img, err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(img);
                        }
                    });
                });
    });
}