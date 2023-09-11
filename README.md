# Snack

Snack is a web app for running the fridge at Aleap.
The goal is to make purchasing seamless and keep everything light and breezy.

On [snack.aslak.io](https://snack.aslak.io) the user can see what products are available, filter based on search and categories as well as purchase.
Purchasing is simply a button with link to Vipps, and through guessing the url parameters we managed to auto fill in the amount, and a string for the message.

For future reference the url pattern is: `https://qr.vipps.no/28/2/01/031/${phone}?v=1&m={message}&a=${amount}`
`phone` is the phone number you are sending the payment to.
`message` is whatever message you want for the vipps, in our case `Snack`.
`amount` is the price in øre.

The users can access the app through [snack.aslak.io](https://snack.aslak.io) or with the poster posted on the fridge.

![image](https://github.com/aslakhol/snack/assets/11901064/14f1ae87-4a54-4063-9c95-987d238ff057)


## Web

The web project can be found in `/web`. It is running `Next.js`, using `trpc` and `tailwind` with `shadcn/ui`.
The project was bootstrapped with `create-t3-app`.
The project is hosted on `Vercel` and is available at [snack.aslak.io](https://snack.aslak.io).

### Relevant commands

`npm run dev` makes the app available on localhost:3000

Note that there aren't separate datasets for development and production, and as such you need access to the internet for development.

## CMS

In `/cms` you'll find a `Sanity CMS` project for organising the products.
The cms is hosted by `Sanity` and is available at [snack.sanity.studio](https://snack.sanity.studio)

### Relevant commands

`npm run dev` makes the studio available on localhost:3333
`npm run deploy` deploys the studio to sanity's servers.
This is necessary to see data that follows the updated schema, even locally, as we are not running separate datasets for production and development.
