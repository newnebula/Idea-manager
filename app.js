const path = require('path');
const express = require('express');
const Sequelize = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./util/database.js')
const bodyParser = require('body-parser');



const app = express();

const Idea = require('./models/idea');
const Entry = require('./models/entry');
const Day = require('./models/day');
const ToDoThing = require('./models/toDoThing');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const myStore = new SequelizeStore({
    db: sequelize,
  });

app.use(session({
    secret: 'mysecret',
    store: myStore,
    resave:false,
    proxy:true,
    saveUninitialized: false}));

app.set('view engine', 'ejs');
app.set('views','views');

const authRoutes = require('./routes/auth');
app.use(authRoutes);

const authCheck = require('./controllers/auth');
app.use(authCheck.checkIfLoggedIn);

const ideasRoutes = require('./routes/ideas');
app.use(ideasRoutes);

const dayRoutes = require('./routes/days');
app.use(dayRoutes);




//Creates the relationships between the models in DB
Idea.hasMany(Entry, { onDelete: 'CASCADE'});
Entry.belongsTo(Idea);

Day.belongsToMany(Idea, {through: 'DayIdeas'});
Idea.belongsToMany(Day, {through: 'DayIdeas'});

Day.hasMany(ToDoThing, { onDelete: 'CASCADE'});
ToDoThing.belongsTo(Day);

User.hasMany(Idea, {onDelete: 'CASCADE'});
Idea.belongsTo(User);

User.hasMany(Day, { onDelete: 'CASCADE'});
Day.belongsTo(User);

myStore
//.sync({force: true})
.sync()
    .then(
    //Creates the tables for your models defined with sequelize:
    sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        console.log('syncing');
        app.listen(3000)
    })
)
.catch(err => {
    console.log(err);
})


