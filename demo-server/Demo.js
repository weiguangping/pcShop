let user = require('./User')
console.log(`username=${user.userName}`)
console.log(`say=${user.sayHello()}`)

let http = require('http')
let url = require('url')
let util = require('util')
let server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  res.end(util.inspect(url.parse(req.url)))
})
server.listen(3000, 'localhost', () => {
  console.log('服务器已经运行,请打开http://localhost:3000')
})
