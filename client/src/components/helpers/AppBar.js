import React, { Component } from 'react'
import { IconButton, Badge } from '@material-ui/core'
import {
	IoIosNotificationsOutline,
	IoIosLogOut,
	IoIosArrowBack,
} from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'

export default class AppBar extends Component {
	state = {
		dropdown: false,
	}

	changeDropdown = () => {
		this.setState({
			dropdown: !this.state.dropdown,
		})
	}
	render() {
		const { brand } = this.props
		return (
			<div className="appbar">
				{brand ? (
					<div className="brand">
						<Link to="/app">GroupSheet</Link>
					</div>
				) : (
					<Link to="/app">
						<IoIosArrowBack size={30} />
					</Link>
				)}

				<div className="icons">
					<Dropdown isOpen={this.state.dropdown} toggle={this.changeDropdown}>
						<DropdownToggle className="caret" caret>
							<Badge badgeContent={12} color="primary">
								<p>
									<IoIosNotificationsOutline size={29} />
								</p>
							</Badge>
						</DropdownToggle>

						<DropdownMenu className="notifs">
							<DropdownItem>Some Action </DropdownItem>
							<DropdownItem>Foo action</DropdownItem>
							<DropdownItem>Bar Action</DropdownItem>
							<DropdownItem>Quo Action</DropdownItem>
							<DropdownItem>Some Action</DropdownItem>
							<DropdownItem>Foo Action</DropdownItem>
							<DropdownItem>Bar Action</DropdownItem>
							<DropdownItem>Quo Action</DropdownItem>
						</DropdownMenu>
					</Dropdown>

					<IconButton aria-label="show logout button" color="inherit">
						<Link to="/logout">
							<IoIosLogOut size={29} />
						</Link>
					</IconButton>
				</div>
			</div>
		)
	}
}
