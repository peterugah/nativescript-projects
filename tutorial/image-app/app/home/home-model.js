const observableModule = require("tns-core-modules/data/observable").Observable;
const ObsArray = require("tns-core-modules/data/observable-array").ObservableArray;
let appSettings = require("tns-core-modules/application-settings");
let viewModel = new observableModule();

let http = require("tns-core-modules/http");

function HomeViewModel() {
    viewModel.set("final" , false);
    viewModel.set("items", new ObsArray([]));
    viewModel.set("page", 0);
    viewModel.set("skip", 0);
    viewModel.set("limit", 1);
    viewModel.set("lastPage" , false);
    viewModel.set("loader" , false);
    viewModel.set("more" , false);
    viewModel.set("limit" , 3);
    viewModel.set("download"  , `${appSettings.getString("host")}/download`)
    return viewModel;
}

viewModel.showMore  = function()
{
    this.set("more" , true);
}
viewModel.hideMore = function()
{
    this.set("more" , false);
}
viewModel.showLoader = function()
{
    this.set("loader" , true);
}

viewModel.hideLoader = function()
{
    this.set("loader" , false);
}
viewModel.nextPage  = function()
{
    let page = this.get("page");
    this.set("page" , ++page);
}
viewModel.fetchImages = function () {
    let url = `${appSettings.getString("host")}/images?page=${this.get("page")}&id=${appSettings.getString("id")}&limit=${this.get("limit")}`;

    return http.request({
        url:url,
        method: 'GET',
        "timeout": 10000,
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

viewModel.lastPage = function()
{
    return this.get("lastPage");
}
viewModel.setLastPage = function(content)
{   
    if(content.lastPage)
        this.set("lastPage" , true);
}

viewModel.isFinal = function(content)
{
    if(content.final){
        this.hideMore();
        return true;
    }
    return false;
}


module.exports = HomeViewModel;