const websocket = require('ws')
const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const wss = new websocket.Server({ server })
app.on('upgrade', wss.handleUpgrade)

server.listen(3000, () => {
  console.log('server started on PORT 3000')
})

wss.on('connection', socket => {
  console.log('web socket connection is alive')
  socket.send('welcome')

  socket.on('message', function(data){
    const msg = messagesHandler(data)
    socket.send(msg)
  })
})

const messagesHandler = (data) => {
  switch (data) {
    case 'ping':
      return 'pong';
    default:
      break;
  }
} 