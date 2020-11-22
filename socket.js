var socket_io = require('socket.io')
var io = socket_io()
var socketApi = {}
var { getGroupsByUserId, getGroupByGroupId } = require('./controllers/groupCon')
var { getTasksById, addTask } = require('./controllers/taskCon')
socketApi.io = io

io.on('connection', function (socket) {
	let socketGroup
	console.log('CONNECTION: ', socket.id)

	socket.on('join', (group) => {
		console.log(`JOIN: ${socket.id} joining ${group}`)
		socketGroup = group
		socket.join(group)
	})
	socket.on('switch', (data) => {
		const { prev, next } = data
		console.log(`${socket.id} switching ${prev} => ${next}`)

		if (prev) {
			socket.leave(prev)
			console.log('Leaving ', prev)
		}
		if (next) {
			console.log('Joining ', next)
			socket.join(next)
		}
		socketGroup = next
	})

	socket.on('newTask', ({ task, room }) => {
		console.log(`NewTask by ${socket.id} for ${room}`)
		addTask(task).then((data) => {
			io.to(room).emit('newTask', data)
		})
	})

	socket.on('disconnect', () => {
		console.log('DISCONNECTION: ', socket.id)
	})
})

module.exports = socketApi
