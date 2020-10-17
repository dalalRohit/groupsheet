import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { creators, selectors } from './../../store/slices/rootReducer'

export default function SocketManager(props) {
	const dispatch = useDispatch()
	const { fetching, user } = useSelector(selectors.userSelector)
	const { group } = useSelector(selectors.grpSelector)
	const socket = io('http://localhost:5000')
	const [state, setState] = useState({ tasks: [], groups: [] })

	//Welcome
	useEffect(() => {
		socket.on('welcome', (greet) => {
			console.log(greet)
		})
	}, [])

	useEffect(() => {
		socket.emit('init', {
			user: user.user_id,
			group: group ? group.group_id : null,
		})

		socket.on('storeInit', ({ groups, tasks }) => {
			console.log({ groups, tasks })
		})
	}, [user, group])
	useEffect(() => {}, [fetching, user, group])
	return props.children
}
