// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md

const msalConfig = {
    auth: {

        // Replace with your app/client ID on AAD Portal.
        clientId: "Replace Me",

        // add your tenant ID to this URL - i.e., for a tenant ID of 000000-DEADBEEF-CAFE,
        // your value should be "https://login.microsoftonline.com/000000-DEADBEEF-CAFE"
        authority: "https://login.microsoftonline.com/",
        
        // Replace with the redirect uri you setup on AAD Portal
        // This should be the same thing as the root of your SPA -
        // i.e., "https://my-spa-frontend.azurewebsites.net/"
        redirectUri: "Replace Me"

    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                console.log(message);
            }
        }
    }
};

// Add here the scopes that you would like the user to consent during sign-in
const loginRequest = {
    scopes: ["User.Read"]
};
