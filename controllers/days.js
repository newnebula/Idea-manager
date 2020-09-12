const Day = require('../models/day');
const Idea = require('../models/idea');
const ToDoThing = require('../models/toDoThing')
const User = require('../models/user')

//getShowDay is split over two functions getShowDay1 and getShowDay2. Ther are both executed
//when the route '/print-date' is hit.

//getShowTheDay1 checks whether the user has the required day already created. If not it will create it and hand over to getShowTheDay2.
exports.getShowTheDay1 = async (req, res, next) => {
    let foundArrayWithOneDay =null;
    const theUserID =  req.session.theUserID;
    const theUser = await User.findByPk(theUserID);

    foundArrayWithOneDay = await Day.findAll({
        where:{theDate: req.body.date, userId: theUserID}})

    if(foundArrayWithOneDay.length===0){
        newDayCreated = await theUser.createDay({theDate: req.body.date})
    }
    next();
}

//getShowTheDay2 fetches the data about an existing day. This day might be already created long ago or it was not there and got just created with getShowDay1
exports.getShowTheDay2 = async (req, res, next) => {
    let toDosToRender = null;
    let ideasToRender = null;
    let theDateToRender = null;

    if(req.xxxTheDate){
        theDateToRender = req.xxxTheDate;};

    if(req.body.date){
        theDateToRender = req.body.date;};

    if(!theDateToRender){
        res.redirect('/all-ideas');
        console.log('i got no date');

    }else{
        console.log('i got no date and still i go')

        let arrayWithTheDay = null;
        let theUser = await User.findByPk(req.session.theUserID);

        theUser.getDays({where: {theDate: theDateToRender}})
        .then(arrayWithOneDay =>{
            arrayWithTheDay = arrayWithOneDay;
            return arrayWithOneDay[0].getIdeas()
        })
        .then(arrayOfIdeas => {
            ideasToRender = arrayOfIdeas
            return
        })
        .then( nothing => {
            return arrayWithTheDay[0].getToDoThings()
        })
        .then(listOfToDoThings =>{
            toDosToRender = listOfToDoThings
            return
        })
        .then(nothing => {
            res.render('day', {caption: 'day', theDate: theDateToRender ,toDoThings: toDosToRender, ideas: ideasToRender});
        })
        .catch(err=> console.log(err));
    }
}


exports.sendToDoForm = (req, res, next) => {
    res.render('TypeAToDo', {caption: 'plan something'});
}
exports.addAToDo1 = async (req, res, next) => {
    let theUser = await User.findByPk(req.session.theUserID);
    let foundArrayWithOneDay =null;


    foundArrayWithOneDay = await Day.findAll({where:{theDate: req.body.date, userId: req.session.theUserID }})
    if(foundArrayWithOneDay.length===0){

        newDayCreated = await theUser.createDay({theDate: req.body.date});
        newDayCreated.createToDoThing({text: req.body.toDo})
        this.getShowTheDay2(req,res,next);
    } else {
      let xxx = await foundArrayWithOneDay[0].createToDoThing({text: req.body.toDo});
      this.getShowTheDay2(req,res,next);
    }
}

exports.deleteToDo = async (req, res, next ) => {
    const theToDoiD = req.params.toDoId;
    const toDo = await ToDoThing.findByPk(theToDoiD);
    const toDoDay = await toDo.getDay();
    const toDoDate = toDoDay.theDate;


    req.xxxTheDate = toDoDate;

    const nnn= await toDo.destroy();
    this.getShowTheDay2(req,res,next);


}
