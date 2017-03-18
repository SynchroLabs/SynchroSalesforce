# SynchroSalesforce - Synchro Salesforce sample app

This app is intended to be installed into a [Synchro Server](https://synchro.io) environment using the [Synchro Command Line Interface](https://www.npmjs.com/package/synchro) tool.  

The Synchro Salesforce sample app demonstrates how to use Salesforce APIs from a Synchro environment via the [jsforce](https://www.npmjs.com/package/jsforce) JavaScript library (and npm module).  This app is just a starting point for developing your own Saleforce apps on the Synchro platform.

## Installing Synchro Salesforce

To install in your Synchro Server environment using the Synchro CLI:
```
$ synchro install https://github.com/SynchroLabs/SynchroSalesforce/archive/master.zip
```

Alternatively, you may use Git to install this app and keep it up to date.  To do that, you will want to clone SynchroSalesforce (this repo) into the `synchro-apps` directory in your Synchro installation, then install the Synchro Salesforce sample into your configuration using the Synchro CLI:

```
$ synchro add SynchroSalesforce synchro-salesforce
```

## Configuring and Using Synchro Salesforce

Synchro Salesforce will generally work out of the box with no configuration.  If you don't see the Salesforce logo on the main menu of the Synchro Salesforce app when running it on the device, you may need to set your `HOST` config value for proper serving of static resources.  See [Static Resources](http://docs.synchro.io/general/static-resources) in our Help Center for more information.

If you receive a message like the following when attempting to login, you may need to use a security token as directed:

    LOGIN_MUST_USE_SECURITY_TOKEN: Invalid username, password, security token; or user locked out. Are you
    at a new location? When accessing Salesforce--either via a desktop client or the API--from outside of
    your company’s trusted networks, you must add a security token to your password to log in. To get your
    new security token, log in to Salesforce. From your personal settings, enter Reset My Security Token in
    the Quick Find box, then select Reset My Security Token.

By default, Synchro Salesforce employs user and password authentication to Salesforce.  This will require a security token in all cases, and is not suitable for a production deployment.  To use OAuth authentication, where you still use user and password, but authenticate as a Salesforce "Connected App", you can set the following values in your Synchro apps.json file:

    {
        "synchro-salesforce": {
            "container": "SynchroSalesforce",
            "SF_CLIENT_ID": "xxxxx",
            "SF_CLIENT_SECRET": "xxxxx",
            "SF_REDIRECT_URI": "xxxxx"
        }
    }

You will still require a security token unless you do one of the following:

* Make sure you are in the "Trusted IP Range" of the Connected App 
* Set the "IP Relaxation" value to "Relax IP restrictions" for the Connected App

## Updating Synchro Salesforce

If you installed this app using `synchro install`, then you may update it (getting the most recent version) at any time by doing:

```
$ synchro install -u synchro-salesforce
```

Of course if you installed by cloning the repo, then you will use Git to update as appropriate.
