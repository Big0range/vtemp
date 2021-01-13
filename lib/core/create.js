const { program } = require('commander')
const path = require('path')
const inquirer = require('inquirer')

const actions = require('./actions')

const createCommands = () => {
    program
        .command('create <project> [others...]')
        .description('clone template from GitHub (从GitHub上下载模板)')
        .action(actions.createProject)

}
const addComponent = () => {
    program
        .command('component <componentName> [writePath]')
        .description('create component (创建组件)')
        .action((componentName) => {
            actions.addComponent(componentName, program.dest || 'src/components')
        })

}

const addPage = () => {
    program
        .command('page <filename>')
        .description('create page as view (生成页面)')
        .action(actions.addPage)

}

const request = () => {
    program
        .command('request')
        .description('create axios request (生成axios封装的reque方法)')
        .action(() => {
            actions.request(program.dest || 'src/utils', program.type === 'ts' ? 'ts' : 'js')
        })

}

const api = () => {
    program
        .command('api <filename>')
        .description('create axios api (生成请求api)')
        .action((filename) => {
            actions.api(program.dest || 'src/api', filename, program.type === 'ts' ? 'ts' : 'js')
        })

}

const demo = () => {
    program
        .command('demo')
        .description('单选测试')
        .action(async () => {
            inquirer
                .prompt([
                    {
                        name: "name",
                        type: "list",
                        message: "你喜欢哪个老师",
                        choices: ["波多野结衣", "大桥未久", "上原瑞穗", "苍井空", "樱井莉亚", "泷泽萝拉", "冲田杏梨"],
                    }
                ]).then(res => {
                    console.log(res.name, '\n老色批 呵~ 忒!')
                }).catch(err => {
                    console.log('err', err)
                })
        })

}

module.exports = {
    createCommands,
    addComponent,
    addPage,
    request,
    demo,
    api
}