const WS_URL = 'ws://localhost:3000'

let ws
let connectBtn, pingBtn, messagesArea, statusBlock, statusArea, closeBtn, clearBtn

const connectionHandler = (connected) => {
  if(connected) {
    connectBtn.classList.add('connected')
    connectBtn.classList.remove('disconnected')
    connectBtn.innerText = 'DISCONNECT'
  }
  else {
    connectBtn.classList.add('disconnected')
    connectBtn.classList.remove('connected')
    connectBtn.innerText = 'CONNECT'
  }
}

const socketHandler = () => {
  ws.onopen = function () {
    connectionHandler(true)
  }

  ws.onmessage = function (e) {
    messagesArea.value += `${e.data}\r\n`
  }

  ws.onerror = function (e) {
    messagesArea.value += `Error: ${e.data}\r\n`
  }

  ws.onclose = function () {
    connectionHandler(false)
    ws = null
  }
}


document.addEventListener('DOMContentLoaded', () => {
  connectBtn = document.querySelector('.buttons-block .connection')
  pingBtn = document.querySelector('.buttons-block .ping')
  statusBlock = document.querySelector('.buttons-block .status-block')
  statusArea = document.querySelector('.buttons-block .status-block .status')
  closeBtn = document.querySelector('.buttons-block .status-block .close-btn')
  clearBtn = document.querySelector('.message-block .messages-header .clear-btn')
  messagesArea = document.querySelector('.message-block .messages')

  connectBtn.addEventListener('click', () => {
    if(connectBtn.classList.contains('disconnected')) {
      ws = new WebSocket(WS_URL)
      socketHandler()
    }
    else {
      ws.close()
    }
  })

  pingBtn.addEventListener('click', () => {
    try {
      ws.send('ping')
    }
    catch (e) {
      statusArea.innerText = 'Connect to the server, first'
      statusBlock.style.display = 'flex'
    }
  })

  closeBtn.addEventListener('click', () => {
    statusBlock.style.display = 'none'
  })

  clearBtn.addEventListener('click', () => {
    messagesArea.value = ''
  })
})
