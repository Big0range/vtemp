#! /usr/bin/env node
const {program} = require('commander');
//--help 提示
const {helpOptions} = require('./lib/core/help')
//create指令
const {createCommands} = require('./lib/core/create')
//版本号
program.version(require('./package.json').version, '-v,--version');

//增加自己的options
helpOptions()

//创建其他指令
createCommands()

program.parse(process.argv)

console.log(program.dest);