const {program} = require('commander');
const actions = require('./actions')
const createCommands = () => {
    program
        .command('create-app <project> [others...]')
        .description('clone template from GitHub')
        .action(actions.createProject)

}

module.exports = {
    createCommands
}