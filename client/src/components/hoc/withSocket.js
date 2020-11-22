import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { creators, actions } from './../../store/rootReducer'

//Global socket var
let socket

export default function SocketManager(props) {
	const dispatch = useDispatch()

	const { group } = useSelector((state) => state.groups)
	const { tasks } = useSelector((state) => state.tasks)

	//handler functions
	const initSocket = (grp) => {
		socket = io('http://localhost:5000')

		socket.on('connect', () => {
			console.log('Socket Connected.')
			if (socket && grp) {
				console.log(`${socket.id} joining ${grp}`)
				socket.emit('join', grp)
			}
		})
	}

	const disconnect = () => {
		console.log('Disconnecting socket...')
		if (socket) socket.disconnect()
	}
	const switchGroups = (prevGroup, nextGroup) => {
		console.log(
			`${socket.id} switching from ${prevGroup.grp_name} => ${nextGroup.grp_name}`
		)
		if (socket) {
			socket.emit('switch', {
				prev: prevGroup.grp_name,
				next: nextGroup.grp_name,
			})
		}
	}

	const prevGroupRef = useRef()
	useEffect(() => {
		prevGroupRef.current = group
	})
	const prevGroup = prevGroupRef.current
	useEffect(() => {
		if (prevGroup && group) switchGroups(prevGroup, group)
		else if (group) initSocket(group.grp_name)
	}, [group])

	useEffect(() => {
		if (socket) {
			socket.on('newTask', (task) => {
				console.log('newTaskEvent: ', task)
				if (group && group.group_id === task.group_id) {
					// dispatch(creators.taskCreators.addNewTask(task))
					dispatch(actions.taskActions.newTask(task))
				} else {
					console.log('New Task for group: ', task.group_id)
				}
			})
		}
	}, [group])

	return props.children
}
