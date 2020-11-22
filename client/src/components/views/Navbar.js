import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Grid, MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}))
//https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items
const Header = (props) => {
	const classes = useStyles()
	const links = ['Home', 'Login', 'Register']

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar variant="dense">
					<Typography variant="h6" color="inherit">
						GroupSheet
					</Typography>
					<Grid style={{ flexGrow: 2 }} container>
						{links.map((link) => {
							return (
								<Grid item key={Math.random()}>
									<NavLink
										activeClassName="active"
										to={`/${link.toLowerCase()}`}
									>
										<MenuItem>{link}</MenuItem>
									</NavLink>
								</Grid>
							)
						})}
					</Grid>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Header
