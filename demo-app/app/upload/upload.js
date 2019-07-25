const imagePicker = require("nativescript-imagepicker");
const Observable = require("tns-core-modules/data/observable").Observable;
const fs = require("tns-core-modules/file-system");
let page;
let context;
let bghttp = require("nativescript-background-http");
const fetch = require("tns-core-modules/fetch");
const http = require("tns-core-modules/http");
const ImageSource = require("tns-core-modules/image-source");
exports.loaded = args => {
  page = args.object;
  context = page.bindingContext = new Observable();
  context.set("busy", false);
};
exports.uploadImage = args => {
  context.set("busy", true);
  picker = imagePicker.create({
    mode: "single",
    mediaType: "Image"
  });
  picker
    .authorize()
    .then(() => {
      return picker.present();
    })
    .then(item => {
      let image = item.pop();
      context.set("busy", false);
      page.showModal(
        "upload/preview/preview",
        image,
        res => {
          makeHttp(image);
        },
        false
      );
    });
};

function makeHttp(image) {

  console.log(image._android);
  let session = bghttp.session("image-upload");

  let task = session.uploadFile(image._android, {
    url: 'https://1e93b572.ngrok.io/upload',
    method: 'POST',
    headers: {
      "Content-Type": "application/octet-stream",
      "File-Name": 'the name'
  },
  })
  task.on("progress", e => {
    console.log("uploading" + e.currentBytes);
  })
  task.on("complete", e => {
    console.log("uploaded");
  })
  task.on("error", err => {
    console.log("..........................");
    console.log("error : ", err);
    
  })
  return;
  http.request({
    url: 'https://1e93b572.ngrok.io/json',
    method: 'GET',
    // content: JSON.stringify({
    //   name: 'peter',
    //   occupation:'student'
    // })
  }).then(res => console.log(res))
    .catch(err => console.info(err));
  // http.getJSON("http://172.16.156.188:3000/json")
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
}


exports.searchValue = args => {
  // console.log(args);
  console.log(args.object.text);
}
exports.clear = args => {
  console.log("input field cleared");
}