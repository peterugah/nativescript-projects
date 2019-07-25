exports.navigatedTo = function (args)
{
    var page = args.object;
    var context = page.navigationContext;
    console.log(context);
    page.bindingContext = {
        name: context.name,
        occupation : context.occupation
    }
}