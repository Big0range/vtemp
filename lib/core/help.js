const { program } = require('commander');

const helpOptions = () => {
    program.option('-d --dest <dest>', 'create path (文件创建地址)')
    program.option('-t --type <type>', 'create type , js or ts (文件创建类型)')

    //监听事件
    program.on('--help', () => {
        console.log('\n 兄嘚,实在不明白的看看文档了撒');
    })
}
module.exports = {
    helpOptions
}