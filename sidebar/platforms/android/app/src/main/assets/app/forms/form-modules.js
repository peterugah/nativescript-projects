const Obs = require("tns-core-modules/data/observable").Observable;

function User(name, age) {
    this.viewModel = new Obs();
    this.viewModel.set("name", name);
    this.viewModel.set("age", age);
    return this;
}
User.prototype.getName = function () {
    return this.viewModel.get("name");
}

User.prototype.getAge = function () {
    return this.viewModel.get("age");
}
User.prototype.set = function (name , val) {
    this.viewModel.set(name, val);
}
User.prototype.get = function (name) {
    return this.viewModel.get(name);
}
exports.User = User;