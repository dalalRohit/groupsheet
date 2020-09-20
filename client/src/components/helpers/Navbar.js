import React, { useState } from 'react'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from 'reactstrap'
import { NavLink } from 'react-router-dom'
//https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items
const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => setIsOpen(!isOpen)

	const links = ['Home', 'Login', 'Register']
	const authLinks = ['Profile', 'Logout', 'Setting']
	return (
		<header>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand>GroupSheet</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{links.map((link) => {
							return (
								<NavItem key={Math.random()}>
									<NavLink
										activeClassName="active"
										to={`/${link.toLowerCase()}`}
									>
										{link}
									</NavLink>
								</NavItem>
							)
						})}
					</Nav>
				</Collapse>
			</Navbar>
		</header>
	)
}

export default Header
