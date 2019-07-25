const Observable = require("tns-core-modules/data/observable").Observable;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const TokenModel = require("nativescript-ui-autocomplete").TokenModel;
// exports.loaded = args => {
//     let users = ["one", "two", "three" , "four"];
//     obs = new Observable();
//     obsArr = new ObservableArray([]);
//     const page = args.object;
//     page.bindingContext =  obs;
//     for (user in users) {
//         obsArr.push(new TokenModel(users[user] , undefined));
//     }
//     obs.set("dataItems", obsArr);
//     page.bindingContext = obs;
//     // console.log(page.bindingContext.get("dataItems"));
//     // // console.log(page.bindingContext.dataItems);
// }
// exports.tokenAdded = args => {
//     console.log(args.object.text);
// }
// exports.tokenRemoved = args => {
//     console.log("token removed : ", args.object.text);
// }
// exports.textChanged = args => {
//     console.log("the text is changed", args.object.text);
// }

// const autoComplete = require("nativescript-ui-autocomplete");
exports.loaded = args => {
    let page = args.object;
    let autoComplete = page.getViewById("autoComplete");
    page.bindingContext = new Observable();
    page.bindingContext.set("name", "peter");
    autoComplete.loadSuggestionsAsync = function (text) {
        const promise = new Promise((resolve, reject) => {
            let Countries = [];
            Countries.push("onesss");
            Countries.push(new TokenModel(text + "'s", undefined));
            console.log(Countries);
            resolve(Countries);
        });
        return promise;
    }

}