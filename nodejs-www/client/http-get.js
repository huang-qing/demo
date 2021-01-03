const http = require('http')
const options = {
  hostname: '127.0.0.1',
  port: 8899,
  //path: '/user',
  path:"/files/vscode-keyboard-shortcuts-windows.pdf",
  method: 'GET'
}

const req = http.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()