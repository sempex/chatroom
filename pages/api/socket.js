import { Server } from 'Socket.IO'
//req is filled with the Clients information (Automatically by NextJs)
//res can be altered and gets send back to the Client
const SocketHandler = (req, res) => { 
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io


    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })
      socket.on('test', (args) => {
        console.log(args)
      })
    }
    )
  }
  res.end()
}

export default SocketHandler


