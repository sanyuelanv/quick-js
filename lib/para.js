const yargs = require( 'yargs' )
const argv = yargs.argv
// 获取需要的项目种类和设置项目名称
let type = argv.t
let name = argv.n
let path = process.cwd() + '/' + name
let mainPath = require.main.filename.replace('/app.js','').replace('/copy.js','')
let result = null
if ( name ) {
  result = {type,name,path,mainPath}
}
module.exports = result
