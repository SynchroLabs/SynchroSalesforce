// Accounts page
//
var jsforce = require('jsforce');

exports.View =
{
    title: "Accounts",
    elements:
    [
        { control: "stackpanel", orientation: "Vertical", height: "*", width: "*", contents: [
            { control: "listview", select: "None", height: "*", width: "*", binding: { items: "records", onItemClick: { command: "itemClicked", account: "{$data}" } }, 
                itemTemplate: [
                    { control: "stackpanel", orientation: "Horizontal", padding: 5, contents: [
                        { control: "image", resource: "{$root.imgAccount}", height: 50, width: 50 },
                        { control: "stackpanel", orientation: "Vertical", contents: [
                            { control: "text", value: "{Name}" },
                            { control: "text", value: "{Industry}" },
                        ] },
                    ] }
                ],
            },
        ] },
    ]
}

exports.InitializeViewModel = function * (context, session)
{
    var conn = new jsforce.Connection(
    {
        instanceUrl: session.sf_instanceUrl,
        accessToken: session.sf_accessToken
    });

    var result = yield Synchro.yieldAwaitable(context, function(callback)
    {
        conn.query("SELECT Id, Name, Industry FROM Account ORDER BY Name", callback);
    });

    console.log("result: " + JSON.stringify(result, 0 ,4));

    var viewModel = result;
    viewModel.imgAccount = Synchro.getResourceUrl(context, "account.png");
    return viewModel;
}

exports.Commands = 
{
    itemClicked: function(context, session, viewModel, params)
    {
        console.log("Item clicked: " + params.account.Id);
        return Synchro.pushAndNavigateTo(context, "account", { accountId: params.account.Id });
    }
}
