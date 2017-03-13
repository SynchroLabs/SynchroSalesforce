// Login page
//
var jsforce = require('jsforce');

exports.View =
{
    title: "Login",
    elements:
    [
        { control: "image", resource: "{imgLogo}", width: "227" },
        { control: "text", value: "Login", font: { size: 16 }, margin: { bottom: 16 } },
        { control: "text", value: "Username", fontsize: 12, margin: { bottom: 0 } },
        { control: "edit", binding: "username", placeholder: "username", width: 200 },
        { control: "text", value: "Password", fontsize: 12, margin: { bottom: 0 } },
        { control: "password", binding: "password", placeholder: "password", width: 200 },
        { control: "button", caption: "Login", icon: "perm_identity", width: 125, binding: "login" },
    ]
}

exports.InitializeViewModel = function(context, session)
{
    var viewModel =
    {
        imgLogo: Synchro.getResourceUrl(context, "salesforcelogo.png"),
        username: "",
        password: "",
    }
    return viewModel;
}

exports.Commands = 
{
    login: function * (context, session, viewModel)
    {
        try
        {
            var conn = new jsforce.Connection(
            {
                // You can override default loginUrl to connect to sandbox or prerelease env.
                // loginUrl : 'https://test.salesforce.com'
            });

            var userInfo = yield Synchro.yieldAwaitable(context, function(callback)
            { 
                conn.login(viewModel.username, viewModel.password, callback) 
            });

            // logged in user
            console.log("Logged in user id: " + userInfo.id + ", organizationId: " + userInfo.organizationId);

            // Store Salesforce access credentials for future reqests...
            //
            session.sf_instanceUrl = conn.instanceUrl;
            session.sf_accessToken = conn.accessToken;

            return Synchro.navigateTo(context, "main");
        }
        catch (err)
        {
            console.log(err);
            return Synchro.showMessage(context, { title: "Login Error", message: err.message });
        }
    },
}
