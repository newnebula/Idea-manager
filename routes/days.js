const path = require('path');
const express = require('express');
const daysController = require('../controllers/days');
const router = express.Router();


//getShowDay is split over two functions getShowDay1 and getShowDay2. Ther are both executed
//when the route '/print-date' is hit. See more comment in controller.
router.post('/print-date', daysController.getShowTheDay1);
router.post('/print-date', daysController.getShowTheDay2);

router.get('/add-toDoForm', daysController.sendToDoForm);
router.post('/add-ToDo', daysController.addAToDo1);
router.get('/deleteToDo/:toDoId', daysController.deleteToDo);

module.exports = router;


// (req,res,next)=>{
//     console.log(typeof req.body.date);
//     res.redirect("/");
// '/add-idea', ideasController.addIdeaPost