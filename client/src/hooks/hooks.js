import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export const useHooks = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', () => {
				setWidth(window.innerWidth)

				return () => {
					window.removeEventListener('resize', () => {
						setWidth(window.innerWidth)
					})
				}
			})
		}
	}, [])
	return width
}

export const useSocket = () => {
	let API = 'http://localhost:5000/'
	let socket = io(API)

	return socket
}
