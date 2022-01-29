var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.projectsController.getProjects(res);

    // get projects from database
    //getProjects(res)

})

router.post('/', (req, res) => {
    Controllers.projectsController.createProject(req.body, res)
    /*console.log('New project posted')
    console.log('body', req.body)
    let project = req.body;
    res.send(req.body)*/
    //insertProject(project, res)
})


module.exports = router;