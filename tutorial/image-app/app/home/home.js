let HomeModel = require("./home-model");
let page, viewModel;
let dialog = require("tns-core-modules/ui/dialogs");
let appSettings = require("tns-core-modules/application-settings");
let statusBar = require("../shared/funcs").setStatusBar
let func = require("../shared/funcs");

exports.loaded = async args => {
    page = args.object;

    viewModel = page.bindingContext = new HomeModel();

    statusBar("#4d546d")

    func.showLoader(viewModel)
    console.log("i hope it works well this time...");

    let images = await viewModel.fetchImages()

    let content = JSON.parse(images.content);
    
    func.hideLoader(viewModel)

    if(viewModel.isFinal(content))return;
    
 
    if (func.showErrors(content.error, viewModel)) return;
   
    if(content.length !== 0 ){
        viewModel.set("itemsLoaded" , true);
    }
    
    viewModel.get("items").push(content);
    
    animateListView();
   
    viewModel.showMore();
}

exports.gotoUploadPage = args => {
    page.frame.navigate({
        moduleName: "upload/upload",
        animated: true,
        transition: {
            name: 'slideRight',
            curve: 'easeInOut'
        }
    })
}
exports.logout = async args => {

    let result = await dialog.confirm("are you sure ?");
   
    if (!result) return;
   
    appSettings.setBoolean("loggedIn", false);
   
    page.frame.navigate("login/login")
}

exports.editImage = args => {
   
    let content = viewModel.get("items").getItem(args.index);
   
    page.showModal("edit/edit", content, cb => {
     
        if (!cb) return;
     
        if (cb.type === 'update') {
            let listView = page.getViewById("imagesList")
            listView.refresh();
            animateListView();
        }

        if (cb.type === 'delete') {
            viewModel.get("items").splice(args.index, 1);
            animateListView();
        }

    });
}

exports.loadMore =async ()=>{

   
    func.showLoader(viewModel);
  
    viewModel.nextPage();
    
    let image = await viewModel.fetchImages();
   
    let content = JSON.parse(image.content);

    func.hideLoader(viewModel);

    if(viewModel.isFinal(content))return;
   
    if (func.showErrors(content.error, viewModel)) return;
   
    viewModel.get("items").push(content);
    
    let listView = page.getViewById("imagesList")

   setTimeout(()=>{
    listView.scrollToIndexAnimated(viewModel.get("items").length - viewModel.get("page"));
    animateListView();
   } , 200);

}

function animateListView() {
   
    let listView = page.getViewById("imagesList")
   
    listView.className = 'animate';
    
    setTimeout(() => {
        listView.className = '';
    }, 1000)
}