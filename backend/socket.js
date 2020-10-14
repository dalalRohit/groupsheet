var socket_io = require('socket.io')
var io = socket_io()
var socketApi = {}
const helpers = require('./utils/queries')
socketApi.io = io

io.on('connection', function (socket) {
	console.log('A New user connected', socket.id)

	socket.on('disconnect', () => {
		console.log('A user left...', socket.id)
	})
})

socketApi.sendNotification = function () {
	io.sockets.emit('hello', { msg: 'Hello World!' })
}

module.exports = socketApi
