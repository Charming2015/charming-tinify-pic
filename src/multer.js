const multer  = require('multer')
const path = require('path');
const {
  createFolder
} = require('./utils')
const {
  UPLOAD_PATH
} = require('./config')
const uploadFolder = path.join(__dirname, UPLOAD_PATH)
createFolder(uploadFolder);
// 通过 filename 属性定制
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    const nameARR = file.originalname.split(".");
    cb(null, nameARR[0] + '-' + Date.now() +'.'+ nameARR[nameARR.length - 1]);
  }
});
const upload = multer({ storage });
module.exports = upload