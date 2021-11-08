# HOW-TO: Use Azure AD to authenticate to a SPA that calls a Function App

By the end of this guide, you will be able to:

* Create a Javascript single-page app
* That uses a HTTP-triggered Function App as an API layer
* Both of which are secured through your domain login in Azure Active Directory
* On the Microsoft Azure platform
* And maybe understand what you've just done.

These things would seem to not be very difficult; and they are not difficult, but it is __very important__ that you take extra-special care to fllow these instructions _exactly as they are written_.

I have gone through great pains to understand this small body of knowledge well enough to write about it here; my wish is to circumnavigate that painful element for anyone who comes after me, who should wish to understand it as I do.

So let's begin.

## A brief overview

Here's a simplified diagram that shows the components that you are going to create, their relationships, and where they live in Azure:

![Basic Diagram](./readme-images/basic-diagram.svg)

So at first glance, this is pretty simple:

* The SPA is a simple Azure Static Site that uses an `index.html` file to host some Javascript
* The Function App is a HTTP-triggered Function App that acts as an API for your application
* Your web browser loads the SPA and makes requests to the Function App API to run your functions

However, if you want to use Azure Active Directory (referred to henceforth as "Azure AD") to authenticate users, you need to create __App Registrations__. App Registrations allow you to _register_ your _app_ with the Microsoft Identity Platform. Plainly stated, this means that you can configure your app to restrict access to users that have identified themselves as a member of your Active Directory domain. You can also integrate with MSAL.js, Microsoft's Javascript library for authentication, to get an authorization token that allows you to communicate with your apps via HTTP.

With these concepts introduced, we can look at a more complex flow diagram:

![Flow Diagram](./readme-images/flow-diagram.svg)
