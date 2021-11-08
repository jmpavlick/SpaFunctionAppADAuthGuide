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

### Legend

* Navigate: A -> B -> C means, "click through the prompts in the Azure Portal in this order"
* __Bold__ means, "click the control with this label"
* `monospaced text` means, "this is the value you should enter into the field"

## Step 0: Fork this repo

Start by forking this repo on Github. It contains the minimum-viable frontend code that you'll need to update with your configuration values.

## Step 1: Create and deploy a new Azure Static App

The `frontend` folder in this Github repo contains the skeleton of a SPA that is wired in to [MSAL.js 2.0](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications), with functions created to manage login and function app execution. The skeleton can run, now; the auth stuff won't work, but the skeleton is ready to be deployed.

### Create a resource group for your assets

While not strictly necessary - you can re-use an existing resource group if you have one - making a new resource group will allow you to delete all of your demo assets when you're done with them. If you don't create a new resource group, _make sure that all of the resources you create in Azure are in the same resource group!_.

On the Azure portal:

* Navigate: Resource groups
	* __Create__
		1. Subscription: Select your subscription
		1. Resource group: `spaFunctionAppADAuthGuide`
		1. Region: Select a region that's close to you. I picked `(US) East US)`.
		1. __Review + create__
		1. __Create__

### Create a new Static Web App

Next, you will create an Azure Static Web App to host your `index.html` and Javascript code from the `frontend` folder on your Github fork.

On the Azure portal:

* Navigate: Static Web Apps
	* __Create__
		1. Subscription: Select your subscription
		1. Resource group: `spaFunctionAppADAuthGuide`
		1. Name: `frontend`
		1. Plan type: `Standard`
			* Note: Free tier isn't eligible for Azure AD login
		1. Region for Azure Functions API and staging environments: Select a region that's close to you. I picked `East US 2`.
		1. Source: `GitHub`
		1. __Sign in with GitHub__
