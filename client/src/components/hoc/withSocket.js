import { useEffect } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { creators } from './../../store/rootReducer'
export default function SocketManager(props) {
	const dispatch = useDispatch()

	const { group } = useSelector((state) => state.groups)
	const socket = io('http://localhost:5000')

	//Welcome
	useEffect(() => {
		socket.on('welcome', (greet) => {
			console.log(greet)
		})
	}, [])

	useEffect(() => {
		socket.on('newTask', (task) => {
			if (group && group.group_id === task.group_id) {
				dispatch(creators.taskCreators.addNewTask(task))
			} else {
				console.log('New Task for group: ', task.group_id)
			}
		})

		return () => {
			console.log('Leaving Group')
		}
	}, [group])

	return props.children
}
