const {program} = require('commander');
const actions = require('./actions')
const createCommands = () => {
    program
        .command('create <project> [others...]')
        .description('clone template from GitHub (从GitHub上下载模板)')
        .action(actions.createProject)

}

module.exports = {
    createCommands
}