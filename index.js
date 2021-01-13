#! /usr/bin/env node
const {program} = require('commander');
//--help 提示
const {helpOptions} = require('./lib/core/help')
//create指令
const {createCommands,addComponent,addPage,request,api, demo} = require('./lib/core/create');
//版本号
program.version(require('./package.json').version, '-v,--version','version(版本号)');

//增加自己的options
helpOptions()

//创建其他指令

//创建项目
createCommands()
//创建组件
addComponent()
//创建页面
addPage()
//生成request
request()
//生成api
api()
//demo
demo()
program.parse(process.argv)