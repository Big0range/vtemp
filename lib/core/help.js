const {program} = require('commander');

const helpOptions = () => {
    program.option('-d --dest <dest>', '????')

    //监听事件
    program.on('--help', () => {
        console.log('\n 监听help');
    })
}
module.exports = {
    helpOptions
}