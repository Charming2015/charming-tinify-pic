const { apiKey } = require('./config')
const tinify = require('tinify')
tinify.key = apiKey
module.exports = tinify