import React from 'react'
import Header from '../helpers/Navbar'
import Footer from '../helpers/Footer'
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
