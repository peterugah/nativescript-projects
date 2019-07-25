let cb, page, context;
let imageResource = require("tns-core-modules/image-source")
let fs = require("tns-core-modules/file-system");
let confirm = require("tns-core-modules/ui/dialogs").confirm;
let http  = require("tns-core-modules/http");
let appSettings  = require("tns-core-modules/application-settings");

exports.shownModally = args => {
    let page = args.object;
    context = page.bindingContext = args.context;
    cb = args.closeCallback;
}

exports.update = async args=>{
    // let res = await confirm("are you sure?");
    // if(!res) return;
    context.description = context.description.trim();
    http.request({
        method : 'POST',
        url : `${appSettings.getString("host")}/update`,
        content : JSON.stringify({
            description: context.description,
            id : context._id,

        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then(res=>{
        cb({type : 'update'});
    })
    .catch(err=>console.log(err))
}

exports.deleteImage = args=>{
    let basename = context.image.split("/").pop();
    http.request({
        method : 'POST',
        url : `${appSettings.getString("host")}/delete`,
        content : JSON.stringify({
            id : context._id,
            user_id : appSettings.getString("id"),
            name : basename
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    .then((res)=>{
        console.log(res);
        cb({type : 'delete'})
    })
    .catch(err=>console.log(err));
}