import React from 'react'
import Header from '../views/Navbar'
import Footer from '../views/Footer'

const Layout = (props) => {
	return (
		<>
			<Header />
			<main className="main">{props.children}</main>
			<Footer />
		</>
	)
}

export default Layout
