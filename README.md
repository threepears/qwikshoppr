# QwikShoppr

A grocery shopping list management mobile application built in Ionic with AngularJS.

### Goal

Create a native mobile application that would ease the process of creating an interactive grocery list on a phone. User can click into the form field and use the native voice dictation option to say the names of items to be purchased, separating each item with the keyword "next". When finished speaking, the user would submit the dictated text, which would be processed and printed out on the screen as a list. Each list item can be checked off after purchased, with the option to toggle back to active if a mistake was made. Items can also be deleted.

### Tools Used

Ionic, Angular, Code editor

### Installation

Create new repository and enter the following command:

```sh
$ git clone https://github.com/threepears/qwikshoppr.git
```

You will need to have Node.js installed on your computer, and only version 4 will work (Node 5 is not currently compatible). Then you can install Cordova and Ionic with this Terminal command:

```sh
$ npm install -g cordova ionic
```

Run the following command to install all dependencies:

```sh
$ npm install
```

Now you can show the app in your browser by running this Terminal command:

```sh
$ ionic serve
```

Your browser should open automatically and, although you have to type your list out when using a browser instead of a phone, you can start to use the application!
