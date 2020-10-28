var socket_io = require('socket.io')
var io = socket_io()
var socketApi = {}
var { getGroupsByUserId, getGroupByGroupId } = require('./controllers/groupCon')
var { getTasksById, addTask } = require('./controllers/taskCon')
socketApi.io = io

io.on('connection', function (socket) {
	console.log('% A New user connected %', socket.id)
	socket.emit('welcome', `Welcome to GroupSheet! ${socket.id}`)

	socket.on('newTask', (task) => {
		addTask(task).then((data) => {
			io.emit('newTask', data)
		})
	})
	socket.on('disconnect', () => {
		console.log('A user left...', socket.id)
	})
})

module.exports = socketApi
