const fs = require( 'fs' )
const copy = require( "copy-paste" );
const yargs = require( 'yargs' )
const argv = yargs.argv
// 获取需要的项目种类和设置项目名称
let type = argv.t
let n = argv.n
let mainPath = require.main.filename.replace( '/copy.js', '' )
let url = mainPath + "/template/" + type
fs.stat( url, ( err, stat ) => {
  if ( err ) {
    console.log( "====不存在该名字的模版文件" );

  } else {
    console.log( "====复制文件内容" );
    fs.readFile( url, 'utf8', ( err, res ) => {
      if ( err ) {
        console.log( "获取模版工程文件内容失败" );
      } else {
        res = res.replace(/@name/g,n)
        copy.copy( res, function() {
          console.log( "====SUCCESS" );
        } )
      }
    } )

  }
} );
