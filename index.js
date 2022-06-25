const express = require('express')
const path = require('path')
const socketIo = require('socket.io')


const app = express()

const port = 3000


app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(port, () => {
    console.log('server running')
})


//fazendo conexao com o socket
const io = socketIo(server)

//socket é quem conecta o front e o backend
io.on('connection', (socket) => {
    socket.broadcast.emit('hello socket!', { msg: `chegou um novo usuario` })
})


/*entendendo a exemplificacao: criando uma variavel io a mesma vai gerenciar todos os sockets
  enquanto a variavel socket gerencia apenas sockets locais, como um navegador por ver, por exemplo...
*/

//server é quem está gerenciando as requisicoes http
/*um dos meios de rodar um servidor com socket.io
# const http = require('http')
#
# const server = http.Server(app)
#
# server.listen(port, () => {
#    console.log('server running')
# })
#
# const io = socketIo(server)
#*/