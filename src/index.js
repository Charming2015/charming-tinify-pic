const express = require('express')
const app = express()
const path = require('path');
const chalk = require('chalk');
const tinify = require('./tinify')
const upload = require('./multer')

const { validateTinify, getFileSize, delDir } = require('./utils')
const {
  PORT,
  UPLOAD_PATH,
  ASSETS_UPLOAD_URL,
  FORM_ITEM_NAME,
  MANAGER_PWD
} = require('./config')



const TEMPLATE_PATH = 'template'
app.set("view engine","ejs");
app.set('views',path.join(__dirname, TEMPLATE_PATH));

app.get('/', async function (req, res) {
  res.render('index', {
    FORM_ITEM_NAME
  });
})
app.get('/clear', async function (req, res) {
  if (req.query.pwd && req.query.pwd === MANAGER_PWD) {
    delDir(path.join(__dirname, UPLOAD_PATH))
    res.send({
      status: 'success',
      msg: '清除成功！'
    })
  } else {
    res.send({
      status: 'fail',
      msg: '密码错误！'
    })
  }
})
app.get('/leftTimes', async function(req, res) {
  const leftTimes = await validateTinify(tinify)
  res.send({
    leftTimes
  })
})
app.post('/upload', upload.single(FORM_ITEM_NAME), async function(req, res, next){
  var file = req.file;
  const filepath = file.destination + file.filename
  const source = await tinify.fromFile(filepath);
  await source.toFile(filepath);
  const size = await getFileSize(filepath)
  res.send({
    file: {
      ...file,
      url: ASSETS_UPLOAD_URL + file.filename,
      compressedSize: size
    }
  })
});
app.use(ASSETS_UPLOAD_URL, express.static(path.join(__dirname, UPLOAD_PATH)));
app.listen(PORT, async (err) => {
  if (err) {
    console.log(chalk.red('程序启动失败'))
    return ;
  }
  console.log(chalk.green('程序启动在端口：http://localhost:' + PORT))
})