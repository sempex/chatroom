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
      socket.on('test', msg => {
        console.log(msg)
      }
      )
      socket.on('join', room => {
        socket.join(room)
        console.log(socket.rooms)
        socket.to(room).emit('welcome', "Welcome to this Conversation!")
      }
      )
      socket.on('message', message => {
        socket.to([...socket.rooms][1]).emit('serverMessage', message)
      })
      //socket.emit("some event", "Hallo Welt")
      })
    }
  res.end()
}

export default SocketHandler


