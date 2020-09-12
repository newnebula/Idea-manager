const Day = require('../models/day');
const Idea = require('../models/idea');
const ToDoThing = require('../models/toDoThing');
const User = require('../models/user');
const BCrypt = require('bcryptjs');


exports.getSignInForm = (req, res, next) => {
    const qrWp = req.query.wrongPassword;
    const qrWu = req.query.wrongUsername;

    res.render('SignInForm', {caption: 'sign in', wrongPassword: req.query.wrongPassword,
                             wrongUsername: req.query.wrongUsername});
}

exports.getLogInForm = (req, res, next) => {
    res.render('LogInForm', {caption: 'log in'});
}

exports.signIn = (req, res, next) =>{

    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if(password===confirmPassword){

        User.findAll({where:{userName: username}})
        .then( arrayWithUser=>{

            if(arrayWithUser.length===0){


                BCrypt.hash(password, 12)
                .then(hashedPassword =>{
                    User.create({
                        userName: username,
                        userPassword: hashedPassword
                    })
                    .then(res.redirect('/LogInGet'))

                })



            }else{
                res.redirect('/signInGet/?wrongPassword=false&wrongUsername=true');
            }
        })
        .catch(err => console.log(err))
    }else{
        res.redirect('/signInGet/?wrongPassword=true&wrongUsername=flase');
    }

}



exports.logIn = (req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;

    User.findAll({where:{ userName: username}})
    .then(listWithOneUser =>{
        if(listWithOneUser.length===0){
            res.redirect('/LogInGet')
        }else{

            BCrypt
            .compare( password, listWithOneUser[0].userPassword)
            .then(passMatch =>{

                if(passMatch===false){
                    res.redirect('/LogInGet')
                }else{
                    req.session.isLoggedIn = true;
                    req.session.theUserID = listWithOneUser[0].id;
                    req.session.save(nothing =>{
                        res.redirect('/all-ideas');
                    })
                }
            })
        }
    })
}

exports.logOut = (req, res, next) =>{
    req.session.destroy(err=> {
        console.log(err);
        res.redirect('/');
    });

}

exports.checkIfLoggedIn = (req,res,next) => {
    if(!req.session.isLoggedIn){
        res.redirect('/LogInGet')
    }else{next()}
}