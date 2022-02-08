let Service = require("../services");

const getProject = (res) => {
    console.log('controller ')
    Service.ProjectService.getAllProject(res)
}

const createProject = (data, res) => {
    Service.ProjectService.insertProject(data,res)
}
module.exports = {
    getProject, createProject
}