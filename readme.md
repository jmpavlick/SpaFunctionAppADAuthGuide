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


