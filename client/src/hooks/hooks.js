import React, { useEffect, useState } from 'react'

export default function useHooks() {
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
