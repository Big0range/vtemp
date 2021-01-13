const { promisify } = require('util')
const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')
const download = promisify(require('download-git-repo'))

const { write } = require('../utils/fs')
const { commandSpawn } = require('../utils/terminal')
const { compileEjs } = require('../utils/compile-ejs')

const isWin32 = process.platform === 'win32'
//创建项目
const createProject = async (project) => {
    // commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn',['serve'],{cwd:`./${project}`})
    // console.log('\x1B[31m DONE \x1B[32m Compiled successfully in 19987ms\x1B[0m')
    
    try {
        // clone 模板
        const { open } = await inquirer
            .prompt([
                {
                    name: "open",
                    type: "list",
                    message: "Whether to run the project after installation and open a browser\n安装完成是否运行项目并打开浏览器",
                    choices: ["Yes", "No"]
                }
            ])
        console.log('\x1B[32mdownloading(下载中)\n\x1B[0m');
        await download('direct:https://github.com/Big0range/vue-template.git', project, { clone: true })
        console.log('\x1B[32m%s\x1B[0m', 'download successfully(下载完成)\n')
        //修改package.json 的name
        const packagePath = path.resolve(path.resolve(), project, 'package.json')
        let packageData = await fs.promises.readFile(packagePath, { encoding: 'utf8' })
        packageData = packageData.replace('vue-template', project)
        await write(packagePath, packageData)
        
        // //安装依赖
        console.log('\x1B[32m%s\x1B[0m', 'Installation dependencies in(安装项目依赖中)\n')
        await commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn', { cwd: `./${project}` })
        console.log('\x1B[32mInstallation dependencies is succeed(依赖安装完成,如有依赖安装失败请手动安装)\n\x1B[0m');

        if (open === 'Yes') {
            console.log('\x1B[32myarn serve,Open browser by default(执行 yarn serve 并打开浏览器)\n\x1B[0m');
            commandSpawn(isWin32 ? 'yarn.cmd' : 'yarn', ['serve', '--open'], { cwd: `./${project}` })
        }
        // console.log('\x1B[34m%s\x1B[0m','open browser(打开浏览器)')
        // await open('http://localhost:8080/').then(console).catch(console)
    } catch (error) {
        console.log('\x1B[31m%s\x1B[0m', 'failed(运行失败)\n', error)
        // console.log('\x1B[31m%s\x1B[0m',error)
    }

}

//添加组件
const addComponent = async (name, writePath) => {
    //编译模板
    const data = await compileEjs('vue-component', { lowerName: name.toLowerCase(), name: name })
    //写入文件
    // console.log(path.resolve(writePath))
    //判断文件夹是否存在
    if (!fs.existsSync(path.resolve(writePath))) {
        console.log('指定文件夹不存在,将为您创建')
        await fs.promises.mkdir(writePath, { recursive: true })
    }
    write(path.resolve(writePath, `${name}.vue`), data).then(res => {
        console.log('write succeed(写入成功)')
    }).catch(console.log)

    // fs.promises.stat(path.resolve(writePath)).then(res => {
    //     // console.log('res',res)
    // }).catch(err => {
    //     console.log('指定文件夹不存在,将为您创建')
    //     return fs.promises.mkdir(writePath, { recursive: true })
    // }).then(res => {
    //     // console.log("res2",res)
    //     return write(path.resolve(writePath, `${name}.vue`), data)
    // }).then(res => {
    //     console.log('write succeed(写入成功)')
    // }).catch(console.log)


}

//添加页面
const addPage = async (name) => {
    const templeat = await compileEjs('vue-component', { lowerName: name.toLowerCase(), name: name })
    const router = await compileEjs('vue-router', { lowerName: name.toLowerCase(), name: name })
    const writePathBase = path.resolve('src/views')

    const writeAll = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await write(path.resolve(writePathBase, `${name}/${name}.vue`), templeat)
                await write(path.resolve(writePathBase, `${name}/router.ts`), router)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    //创建文件夹
    fs.promises.mkdir(path.resolve(writePathBase, name), { recursive: true }).then(() => {
        // console.log(3)
        writeAll()
    }).then(() => {
        console.log('页面创建成功')
    }).catch(() => {
        console.log('页面创建失败')
    })
}
const request = async (src, type) => {

    const writePath = path.resolve(src)
    const configTempleat = await compileEjs('axios-config')
    const requestTempleat = await compileEjs(`axios-${type}-request`)

    const writeAll = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await write(path.resolve(writePath, `config.${type}`), configTempleat)
                await write(path.resolve(writePath, `request.${type}`), requestTempleat)
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }
    fs.promises.stat(writePath).then(res => {
        // console.log('res',res)
    }).catch(err => {
        console.log('指定文件夹不存在,将为您创建')
        return fs.promises.mkdir(writePath, { recursive: true })
    }).then(() => {
        return writeAll()
    }).then(() => {
        console.log('Ok')
    }).catch(err => {
        console.log('Error', err)
    })

}

const api = async (src, name, type) => {
    const writePath = path.resolve(src)
    const apiTempleat = await compileEjs('axios-api')
    if (!fs.existsSync(writePath)) {
        console.log('指定文件夹不存在,将为您创建')
        await fs.promises.mkdir(writePath, { recursive: true })
    }
    await write(path.resolve(writePath, `${name}.${type}`), apiTempleat)
}
module.exports = {
    createProject,
    addComponent,
    addPage,
    request,
    api
}