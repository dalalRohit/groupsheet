var socket_io = require('socket.io')
var io = socket_io()
var socketApi = {}
const { getGroupsById } = require('./controllers/groupCon')
socketApi.io = io

io.on('connection', function (socket) {
	console.log('% A New user connected %', socket.id)
	socket.emit('welcome', `Welcome to GroupSheet! ${socket.id}`)

	socket.on('init', ({ user, group }) => {
		socket.emit('storeInit', {
			tasks: group ? ['tasks'] : null,
			groups: ['groups'],
		})
	})

	socket.on('disconnect', () => {
		console.log('A user left...', socket.id)
	})
})

module.exports = socketApi
