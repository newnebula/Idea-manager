const Idea = require('../models/idea');
const Entry = require('../models/entry');
const Day = require('../models/day');
const User = require('../models/user');



exports.showAllIdeas = async (req, res, next) => {
    const theUserID = req.session.theUserID;

    const theOneUser = await User.findByPk(theUserID);

    const theUsername = theOneUser.userName;

    // Idea.findAll({raw: true})

    theOneUser.getIdeas()  //<--changed
    .then(_ideas => {
        res.render('allIdeas', {
            caption: theUsername,
            ideas: _ideas
        });
    })
    .catch(err =>console.log(err))
};


exports.startPageShow = (req, res, next) => {
    res.render('startpage', {
        caption: 'welcome'
    });
};



exports.addIdea = (req, res, next) => {
    res.render('addIdea', {
        caption: 'add idea'
    });
};

exports.addIdeaPost = async (req, res, next) => {

    const theUserID = req.session.theUserID;
    const theOneUser = await User.findByPk(theUserID);

    const title = req.body.title;
    const description = req.body.description;

    // Idea.create({

    theOneUser.createIdea({   //<-changed
        title: title,
        priority: 1,
        description: description,
        diary: 'DummyDiary'

    })
    .then(result=>{

        res.redirect('/all-ideas');
    })
        .catch(err=>{
        console.log(err);
    });
};

exports.editIdeaGet = (req,res,next) => {
    const ideaId = req.params.ideaId

    Idea.findByPk(ideaId)
    .then(
        idea => res.render('editIdea', {caption:"edit idea" , idea: idea })
    )
}

exports.editIdeaPost = (req,res,next) => {
    const new_title = req.body.new_title;
    const new_description = req.body.new_description;
    const ideaId = req.params.ideaId

    Idea.findByPk(ideaId)
    .then(
        idea => {
            idea.title = new_title;
            idea.description = new_description;
            return idea.save();
    })
    .then(result => {res.redirect("/details/".concat(ideaId))})
    .catch(err => console.log(err))
}



exports.showDetails = (req, res, next) => {
    const _id = req.params.iId
    let ideaForTemplate = null;
    let entriesForTemplate = [];

    Idea.findByPk(_id, {raw: true})
    .then(rawIdea => {
        ideaForTemplate = rawIdea;
        return ideaForTemplate;
    })
    .then(
        result=>{
           return Idea.findByPk(_id);
        }
    )
    .then(_idea => {
        return _idea.getEntries();
    })
    .then(
        _entries => {
            _entries.forEach(
              entry => {
                  entriesForTemplate.push([entry.createdAt.toLocaleDateString('PL'), entry.text])
              }
            )
            return entriesForTemplate;
        }
    )
    .then(result =>{
            res.render('ideaDetails', {caption: 'idea details', idea: ideaForTemplate, entries: entriesForTemplate});
        }
    )
}

exports.deleteIdea = (req, res, next) => {
    const _id = req.params.iId
    Idea.destroy({where:{id: _id}})
    .then(
        result=>{

            res.redirect('/all-ideas');
        }
    )
    .catch(err=> console.log(err));
};

exports.addEntry = (req, res, next) => {
    const ideaId = req.params.ideaId
    let textForEntry = null;
    if(req.body.entry!==""){textForEntry = req.body.entry};

    Idea.findByPk(ideaId)
    .then(editedIdea => {

        if(textForEntry === null){editedIdea.createEntry().then(result=>res.redirect("/details/".concat(ideaId)));}
        else{ editedIdea.createEntry({text: textForEntry}).then(result=>res.redirect("/details/".concat(ideaId)));}
    })
    .catch(err=> console.log(err));
};


exports.SendIdeaToADay1 = async (req, res, next) => {
    let theUser = await User.findByPk(req.session.theUserID);
    let foundArrayWithOneDay =null;


    foundArrayWithOneDay = await Day.findAll({where:{theDate: req.body.date, userId: req.session.theUserID}})
    if(foundArrayWithOneDay.length===0){

        newDayCreated = await theUser.createDay({theDate: req.body.date})
    }
    next();
}

exports.SendIdeaToADay2 = (req, res, next) => {
    let theIdea = null;
    let theDay = null;
   Idea.findByPk(req.params.idea_id)
   .then(r=>{
       theIdea = r;

       return
   })
   .then(r=>{

       return Day.findAll({where:{ theDate: req.body.date, userId: req.session.theUserID}})
   })
   .then(r => {

       theDay = r[0];
       return
   })
   .then(r => {
       theDay.addIdea(theIdea);

   })
   .then(res.redirect('/all-ideas'))
   .catch(err=>console.log(err))

};


