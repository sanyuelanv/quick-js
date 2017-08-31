const fs = require( 'fs' )
const createByType = require( './lib/create' )
const config = require( './lib/para' )
// 获取需要的项目种类和设置项目名称
if(!config){
  console.log("====请输入项目名：-n = 项目名");
  return false
}

// 当前执行任务的路径，将在此路径下创建一个项目名称的目录。如果已经有同名文件，则创建失败
fs.access( config.path, fs.constants.R_OK | fs.constants.W_OK, ( err ) => {
  if ( err ) {
    //  木有相关项目，开始创建
    console.log("====1.开始创建");
    createByType(config.type, config.name )

  } else {
    //  已有相关的路径
    console.log( "====当前路径已经有同名项目！" );
  }
} );
