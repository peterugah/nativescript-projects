// let page;
// let Obs = require("tns-core-modules/data/observable").Observable;
// let User = require("./form-modules").User;
// exports.loaded = args => {
//     let user = new User("peter", 25);
//     user.set("occupation ", "doctor");
//     console.log(user.getName());  
//     console.log(user.getAge());
//     console.log(user.get("occupation"));

// }
let Observable = require("tns-core-modules/data/observable").Observable;
exports.gotoHome = args => {
    // args.object.page.navigationContext = {
    //     age: 25,
    //     name: 'peter'
    // }
    var user = new Observable();
    user.set("name", "peter");
    args.object.page.frame.navigate({
        moduleName: 'home/home',
        context: user,
        transition: 'fadeOut',
        animated : false
    })
}