import { useEffect, useState } from 'react'

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
