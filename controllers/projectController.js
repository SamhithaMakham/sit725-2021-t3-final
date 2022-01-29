let Service = require("../services");

const getProjects = (res) => {
    console.log('controller ')
    Service.ProjectService.getAllProjects(res)
}

const createProject = (data, res) => {
    Service.ProjectService.insertProject(data,res)
}

module.exports = {
    getProjects, createProject
}