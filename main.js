// Main page
//
var jsforce = require('jsforce');

exports.View =
{
    title: "Salesforce",
    elements:
    [
        { control: "image", resource: "{imgLogo}", width: "227" },
        { control: "button", caption: "Accounts", icon: "business", binding: "accounts" },
        { control: "button", caption: "Logout", icon: "perm_identity", binding: "logout" },
    ]
}

exports.InitializeViewModel = function * (context, session)
{
    if (session.sf_instanceUrl && session.sf_accessToken)
    {
        // We are logged in...
        //
        var viewModel =
        {
            imgLogo: Synchro.getResourceUrl(context, "salesforcelogo.png"),
        }
        return viewModel;
    }
    else
    {
        // We are not logged in...
        //
        console.log("Redirecting to login");
        return Synchro.navigateTo(context, "login");
    }
}

exports.Commands = 
{
    accounts: function(context, session, viewModel, params)
    {
        return Synchro.pushAndNavigateTo(context, "accounts");
    },
    logout: function(context, session, viewModel, params)
    {
        delete session.sf_instanceUrl;
        delete session.sf_accessToken;
        return Synchro.navigateTo(context, "login");
    }
}
