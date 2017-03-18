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
            var conn;

            // You can change loginUrl to connect to alternate endpoint (sandbox or prerelease env).
            //
            var loginUrl = Synchro.getConfig(context, "SF_LOGIN_URL");

            // OAuth params (if set)
            //
            var clientId = Synchro.getConfig(context, "SF_CLIENT_ID");
            var clientSecret = Synchro.getConfig(context, "SF_CLIENT_SECRET");
            var redirectUri = Synchro.getConfig(context, "SF_REDIRECT_URI");

            // With either login mechanism, user security token may need to be appended to password.
            // 
            if (clientId && clientSecret && redirectUri)
            {
                // Login using oAuth (user/pass)
                //
                // Note: With oAuth, you can remove the user security token requirment for a the connected
                //       app by either being in the configured "Trusted IP Range" of the app or by setting 
                //       the "IP Relaxation" value to "Relax IP restrictions" for the app.
                //
                console.log("Using OAuth with cliendId: ", clientId);
                conn = new jsforce.Connection({
                  oauth2 : {
                    loginUrl : loginUrl,
                    clientId : clientId,
                    clientSecret : clientSecret,
                    redirectUri : redirectUri
                  }
                });
            }
            else
            {
                // Login using plain user/pass
                //
                console.log("Using plain user/pass auth");
                conn = new jsforce.Connection(
                {
                    loginUrl : loginUrl
                });
            }

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
