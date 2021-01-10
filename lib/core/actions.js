const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const open = require('open')
const { commandSpawn } = require('../utils/terminal')
const isWin32 = process.platform === 'win32'
const createProject = async (project) => {
    // commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn',['serve'],{cwd:`./${project}`})
    console.log('\x1B[34mdownloading(下载中)\n\x1B[0m');
    // console.log('\x1B[31m DONE \x1B[32m Compiled successfully in 19987ms\x1B[0m')
    try {
        // clone 模板
    
        await download('direct:https://github.com/Big0range/vue-template.git', project, { clone: true })
        console.log('\x1B[34m%s\x1B[0m','download successfully(下载完成)\n')
        // //安装依赖
        console.log('\x1B[34m%s\x1B[0m','Installation dependencies in(安装项目依赖中)\n')
        await commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn',{cwd:`./${project}`})
        console.log('\x1B[34mInstallation dependencies is succeed(依赖安装完成,如有依赖安装失败请手动安装)\n\x1B[0m');
        console.log('\x1B[34myarn serve,Open browser by default(执行 yarn serve 并打开浏览器)\n\x1B[0m');
        commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn',['serve','--open'],{cwd:`./${project}`})
        // console.log('\x1B[34m%s\x1B[0m','open browser(打开浏览器)')
        // await open('http://localhost:8080/').then(console).catch(console)
    } catch (error) {
        console.log('\x1B[31m%s\x1B[0m','failed(运行失败)\n',error)
        // console.log('\x1B[31m%s\x1B[0m',error)
    }


    // await download('direct:https://github.com/Big0range/vue-template.git#main', project, { clone: true })

    // await commandSpawn('yarn',[''],{cwd:`./${project}`})
}

module.exports = {
    createProject
}