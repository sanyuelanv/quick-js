const argv = require('yargs').argv
const fs = require('fs')
// 获取需要的项目种类和设置项目名称
let projectType = argv.pt || 1
let projectName = argv.pn
if(!pn){
  return false
}
// 当前执行任务的路径，将在此路径下创建一个项目名称的目录。如果已经有同名文件，则创建失败
let currentPath = process.cwd()
fs.access(currentPath,)


console.log();
