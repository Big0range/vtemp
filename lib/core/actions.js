const {promisify} = require('util')
const download = promisify(require('download-git-repo'))
const createProject = (project)=>{
    console.log(project);
}

module.exports ={
    createProject
}