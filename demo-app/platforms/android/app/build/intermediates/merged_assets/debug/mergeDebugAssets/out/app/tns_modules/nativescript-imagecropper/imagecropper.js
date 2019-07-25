"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var image_source_1 = require("tns-core-modules/image-source");
var fs = require("tns-core-modules/file-system");
var _options;
var ctx = application.android.context;
var ImageCropper = (function () {
    function ImageCropper() {
    }
    ImageCropper.prototype.show = function (image, options) {
        return new Promise(function (resolve, reject) {
            try {
                _options = options;
                if (image.android) {
                    var sourcePathTemp = ImageCropper._storeImageSource(image);
                    var folder = fs.knownFolders.temp();
                    var destinationPathTemp = fs.path.join(folder.path, "destTemp.jpeg");
                    if (sourcePathTemp == null) {
                        ImageCropper._cleanFiles();
                        reject({
                            response: "Error",
                            image: null
                        });
                    }
                    var sourcePath = android.net.Uri.parse("file://" + sourcePathTemp);
                    var destinationPath = android.net.Uri.parse("file://" + destinationPathTemp);
                    var onResult_1 = function (args) {
                        var requestCode = args.requestCode;
                        var resultCode = args.resultCode;
                        var data = args.intent;
                        if (resultCode === android.app.Activity.RESULT_OK && requestCode === com.yalantis.ucrop.UCrop.REQUEST_CROP) {
                            var resultUri = com.yalantis.ucrop.UCrop.getOutput(data);
                            var is = new image_source_1.ImageSource();
                            try {
                                is.setNativeSource(android.graphics.BitmapFactory.decodeFile(resultUri.getPath()));
                            }
                            catch (e) {
                                console.error(e);
                            }
                            ImageCropper._cleanFiles();
                            application.android.off(application.AndroidApplication.activityResultEvent, onResult_1);
                            if (is.android) {
                                resolve({
                                    response: "Success",
                                    image: is,
                                });
                            }
                            else {
                                reject({
                                    response: "Error",
                                    image: null
                                });
                            }
                            return;
                        }
                        else if (resultCode === android.app.Activity.RESULT_CANCELED && requestCode === com.yalantis.ucrop.UCrop.REQUEST_CROP) {
                            ImageCropper._cleanFiles();
                            application.android.off(application.AndroidApplication.activityResultEvent, onResult_1);
                            resolve({
                                response: "Cancelled",
                                image: null
                            });
                            return;
                        }
                        else if (resultCode === com.yalantis.ucrop.UCrop.RESULT_ERROR) {
                            ImageCropper._cleanFiles();
                            var cropError = com.yalantis.ucrop.UCrop.getError(data);
                            console.log(cropError.getMessage());
                            application.android.off(application.AndroidApplication.activityResultEvent, onResult_1);
                            reject({
                                response: "Error",
                                image: null
                            });
                            return;
                        }
                    };
                    application.android.on(application.AndroidApplication.activityResultEvent, onResult_1);
                    if (_options && _options.width && _options.height) {
                        var gcd = ImageCropper._gcd(_options.width, _options.height);
                        com.yalantis.ucrop.UCrop.of(sourcePath, destinationPath)
                            .withAspectRatio(_options.width / gcd, _options.height / gcd)
                            .withMaxResultSize(_options.width, _options.height)
                            .start(ImageCropper._getContext());
                    }
                    else {
                        com.yalantis.ucrop.UCrop.of(sourcePath, destinationPath)
                            .start(ImageCropper._getContext());
                    }
                }
                else {
                    reject({
                        response: "Error",
                        image: null
                    });
                }
            }
            catch (e) {
                reject({
                    response: "Error",
                    image: null
                });
            }
        });
    };
    ImageCropper._gcd = function (width, height) {
        if (height === 0) {
            return width;
        }
        else {
            return ImageCropper._gcd(height, width % height);
        }
    };
    ImageCropper._storeImageSource = function (image) {
        var folder = fs.knownFolders.temp();
        var path = fs.path.join(folder.path, "temp.jpeg");
        if (image.saveToFile(path, "jpeg", 100)) {
            return path;
        }
        else {
            return null;
        }
    };
    ImageCropper._cleanFiles = function () {
        var folder = fs.knownFolders.temp();
        folder.clear();
    };
    ImageCropper._getContext = function () {
        return application.android.foregroundActivity;
    };
    return ImageCropper;
}());
exports.ImageCropper = ImageCropper;
