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

This probably looks complicated. It's really not. From 30,000 feet, all of those flow steps are experienced user-side like this:

1. User visits your page and clicks "Sign In"
1. User is redirected to sign in with his Azure AD domain credentials
1. User is redirected back to your page, with a JWT that's saved into local storage
1. All of user's requests to your function app are authenticated with the JWT that he got from signing in

## Getting started

This repo comes with batteries included; all you have to do is snap everything together. To explain these concepts, I've followed the path of least resistance to get a minimum-viable example up and running. If you want to template out your manifests or use Azure CI/CD pipelines or whatever, that's fine, but follow this guide _first_ - then if things go wrong, you'll have a better understanding of what's happening here so that you know where to look.

To follow this guide, you will need:

* A Microsoft Azure subscription
	* NOTE: At time of writing, you can't integrate with Azure AD with a "free tier" subscription
* Visual Studio 2019 with the Azure workload
* Any text editor
* A Github account and a Git client
