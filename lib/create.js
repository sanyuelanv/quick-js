const fs = require( 'fs' )
const config = require( './para' )
let TYPE = null
/**
 * 根据相对的路径来拼接绝对路径
 * @param  {[type]} url [相对的路径]
 * @return {[type]}     [绝对的路径]
 */
let mainURL = ( url ) => {
  return ( config.mainPath + '/' + url )
}
/**
 * 根据相对的文件名字来拼接相对路径
 * @param  {[type]} root [模版文件路径]
 * @param  {[type]} name [文件名字]
 * @return {[type]}      [相对路径]
 */
let urlAddCompoment = ( root, name ) => {
  return root + "/" + name
}
/**
 * 创建文件
 * @param  {[type]} root [模版文件路径]
 * @param  {[type]} name [文件名字]
 * @return {[type]}      [description]
 */
let createTask = ( root, name ,flag) => {
  let rootName = urlAddCompoment( root, name )
  let url = mainURL( rootName )
  fs.stat( url, ( err, stats ) => {
    if ( err ) {
      console.log( "模版工程文件不存在" );
    } else {
      if ( stats.isDirectory() ) {
        //如果是文件夹，先创建当前文件夹，再往下遍历
        fs.readdir( url, ( err, data ) => {
          if ( err ) {
            console.log( "项目模版不存在" );
          } else {
            //console.log(config.path + "/" + name);

            let newDir = config.path + "/" + (flag ? name:rootName.replace(TYPE+"/",''))

            fs.mkdir( newDir, () => {
              console.log(`========创建${newDir}路径成功`);
              for (var i = 0; i < data.length; i++) {
                createTask(rootName,data[i])
              }
            })

          }
        })
      } else {
        //如果不是文件夹，就读取内容，创建同名文件
        fs.readFile( url, 'utf8',( err, res ) => {
          if ( err ) {
            console.log( "获取模版工程文件内容失败" );
          } else {
            let writeFileURL = flag ? (config.path + "/" + name):(config.path + "/" + rootName.replace(TYPE+"/",''))
            res = res.replace(/@name/g,config.name)
            fs.writeFile(writeFileURL,res,'utf8',(err)=>{
              if ( err ) {
                console.log(err)
                console.log( `创建${writeFileURL}文件失败` );
              }
              else {
                console.log( `========创建${writeFileURL}文件成功` );
              }
            })
          }
        } )
      }

    }
  } )
}
let createByType = ( type, name ) => {
  let typeName = "temp-" + type
  TYPE = typeName
  let rootPath = mainURL( typeName )
  fs.readdir( rootPath, ( err, data ) => {
    if ( err ) {
      console.log( "项目模版不存在" );
    } else {
      console.log( "========1.1.创建项目目录：" + config.path );
      fs.mkdir( config.path, () => {
        console.log( "====2.获取模版文件，开始创建" );
        for (var i = 0; i < data.length; i++) {
          createTask( typeName,data[i],true)
        }

      } )
    }
  } )
}
module.exports = createByType
