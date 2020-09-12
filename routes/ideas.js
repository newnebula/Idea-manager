const path = require('path');
const express = require('express');
const ideasController = require('../controllers/ideas');
const router = express.Router();
const auth = require('../controllers/auth');

//auth.checkIfLoggedIn


router.get('/', ideasController.startPageShow);

router.get('/all-ideas', ideasController.showAllIdeas);

router.get('/add-idea', ideasController.addIdea);

router.post('/add-idea', ideasController.addIdeaPost);
router.get('/details/:iId', ideasController.showDetails);

router.get('/delete/:iId', ideasController.deleteIdea);

router.post('/add-entry/:ideaId', ideasController.addEntry);

router.get('/edit-idea/:ideaId', ideasController.editIdeaGet);
router.post('/edit-idea/:ideaId', ideasController.editIdeaPost);

router.post('/sendtoaday/:idea_id', ideasController.SendIdeaToADay1);
router.post('/sendtoaday/:idea_id', ideasController.SendIdeaToADay2);



module.exports = router;
