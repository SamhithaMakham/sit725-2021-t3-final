let client = require("../dbConnect");
let projectCollection;
setTimeout(() => {
    projectCollection = client.mongoClient.db("deakinCrowds").collection("projects");

}, 2000)

const getAllProjects = (res) => {
    projectCollection.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result)
    })
}

const insertProject = (project, res) => {
    projectCollection.insertOne(project, (err, result) => {
        console.log('Project Inserted', result)
        res.send({ result: 200 })
    })
}


module.exports = {
    getAllProjects, insertProject
}