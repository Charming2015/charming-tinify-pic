const fs = require('fs');
const createFolder = function(folder){
  try{
      fs.accessSync(folder); 
  }catch(e){
      fs.mkdirSync(folder);
  }  
};
const validateTinify = async function(tinify) {
  return new Promise(resolve => {
    tinify.validate((err) => {
      if(err){
        console.log(err);
        return resolve(false);
      }
      left = 500 - tinify.compressionCount;
      resolve(left);
    })
  })
}
const getFileSize = async function(p) {
  return new Promise((resolve, reject) => {
    fs.stat(p,function(error,stats){
      if(error){
        throw 'err'
      }else{
        //文件大小
        resolve(stats.size);
      }
    })
  })
}
const delDir = function (path){
  let files = [];
  if(fs.existsSync(path)){
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    // fs.rmdirSync(path);
  }
}
module.exports = {
  createFolder,
  validateTinify,
  getFileSize,
  delDir
}