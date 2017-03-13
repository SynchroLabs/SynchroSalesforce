// Account page
//
var jsforce = require('jsforce');

exports.View =
{
    title: "Account",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", height: "*", width: "*", contents: [
            { control: "stackpanel", orientation: "Horizontal", width: "*", contents: [
                { control: "image", resource: "{$root.imgAccount}", height: 50, width: 50 },
                { control: "text", value: "{Name}", width: "*", font: { bold: true, size: 12 } },
            ] },
            { control: "text", value: "Industry: {Industry}", width: "*", font: { size: 12 } },
            { control: "text", value: "Employees: {NumberOfEmployees}", width: "*", font: { size: 12 } },
            { control: "text", value: "Rating: {Rating}", visibility: "{Rating}", width: "*", font: { size: 12 } },
        ] },
    ]
}

exports.InitializeViewModel = function * (context, session, params)
{
    console.log("Loading account id: ", params.accountId);

    var conn = new jsforce.Connection(
    {
        instanceUrl: session.sf_instanceUrl,
        accessToken: session.sf_accessToken
    });

    var account = yield Synchro.yieldAwaitable(context, function(callback)
    {
        conn.sobject("Account").retrieve(params.accountId, callback);
    });

    console.log("Account: " + JSON.stringify(account, 0, 4));

    var viewModel = account;
    viewModel.imgAccount = Synchro.getResourceUrl(context, "account.png");
    return viewModel;
}
