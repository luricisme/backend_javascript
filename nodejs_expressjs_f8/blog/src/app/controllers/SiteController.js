const Course = require('../models/Course');
const {multipleMongooseToObject} = require('../../util/mongoose');

class SiteController{
    async home(req, res){
        try{
            let courses = await Course.find({}); 
            console.log('Get successfully!!!'); 
            // res.json(courses);
            res.render('home', {
                courses: multipleMongooseToObject(courses),
            });
        }
        catch(err){
            console.log('Get failed!!!');
            res.status(400).json(err);
        }
    }

    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;

