/**
 * 执行终端命令相关的代码
 * 
 */
const { exec, spawn } = require('child_process')

const commandSpawn = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args)
        //输出控制台信息
        childProcess.stdout.pipe(process.stdout)
        //报错信息
        childProcess.stderr.pipe(process.stderr,(err)=>{
            reject(err)
        })
        //监听关闭事件
        childProcess.on('close', () => {
            resolve()
        })
    })
}
module.exports = {
    commandSpawn
}