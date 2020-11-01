import React from 'react'
import { useSelector } from 'react-redux'
import AppLayout from './../Layout/appLayout'
import Group from './Group'
import GroupDetails from './Detail'
import GroupList from './../views/GroupList'
import { Grid, Button } from '@material-ui/core'
import { useHooks } from './../../hooks/hooks'
import Dialog from './../UI/Dialog'
// import { selectors } from './../../store/rootReducer'
const Main = () => {
	const { details } = useSelector((state) => state.groups)
	const [open, setOpen] = React.useState(false)
	const toggle = () => {
		setOpen(!open)
	}
	const width = useHooks()

	return (
		<AppLayout brand>
			{/* style={{ height: '100%', minHeight: '100%' }} */}
			<Grid className="MainApp" container>
				{/* GroupList */}
				<Grid className="group-main" item xs={12} md={3}>
					<GroupList width={width} />
					<Button
						fullWidth
						color="inherit"
						variant="contained"
						onClick={toggle}
					>
						Create Group
					</Button>
					{open ? (
						<Dialog
							title="Create Group"
							open={open}
							onClose={toggle}
							full={true}
							where="groupForm"
						/>
					) : null}
				</Grid>

				{/* Tasks,GroupHeader */}
				{width >= 960 ? (
					<Grid item md={details ? 6 : 9}>
						<Group partial={true} />
					</Grid>
				) : null}

				{/* GroupDetails */}
				{width >= 960 && details ? (
					<Grid item md={3}>
						<GroupDetails />
					</Grid>
				) : null}
			</Grid>
		</AppLayout>
	)
}

export default Main
