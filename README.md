# Idea-manager

[![Maintenance](https://img.shields.io/maintenance/no/2020)](https://img.shields.io/maintenance/no/2020)

***This was my first web development project, and my first attempt at creating an idea manager. It later evolved into [Didit](https://github.com/newnebula/Didit). It is no longer maintained.***

### Technology

A multi-page application based on:

- Node.js
- Express
- MySQL (Sequelize)
- EJS

Structured according to the Model-View-Controller schema.

### Create an instance of the Idea-manager

This application is not available online. It was initially built for personal use, hosted on a Raspberry Pi. In order to have the code running, do the following.

Set up a MySQL database.

Create a `database.js` file in the `util` folder and fill it in with the following:

```
const Sequelize = require('sequelize');
const sequelize = new Sequelize('ideas-manager', 'root', '#YOUR_PASSWORD',{
    dialect:'mysql',
    host:'localhost'
});
module.exports = sequelize;
```

Install and run the project with:

```
npm install
npm start
```

### What is the Idea-manager about

On one hand Idea-manager is a simple to-do list. One plans activities for a given date and deletes them when done. However the application has an extra feature:

User creates a collection of long-term activities (possibly hobbies or projects) which usually don't get strictly planned in and therefore never get done. We call these ***Ideas***.

Once you describe and add an ***Idea*** to your collection, you start managing a diary of this Idea. This means adding a small note whenever you make progress. Such an overview might help to get this (hobby)project completed by keeping related useful information in one place. Besides, seeing the description of all your progress possibly boosts your motivation to continue.

Of course it is possible to plan one or more of your ideas on a given date to prevent you from forgetting them altogether. In this case ideas appear on your day-overview with a different background than the normally planned activities.
