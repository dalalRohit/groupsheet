import React from 'react'
import AppLayout from './../Layout/appLayout'
import Group from './Group'
import GroupList from './../views/GroupList'
import { Grid, Button } from '@material-ui/core'
import { useHooks } from './../../hooks/hooks'
import Dialog from './../UI/Dialog'

const Main = () => {
	const [open, setOpen] = React.useState(false)
	const toggle = () => {
		setOpen(!open)
	}
	const width = useHooks()

	return (
		<AppLayout brand>
			{/* style={{ height: '100%', minHeight: '100%' }} */}
			<Grid className="MainApp" container>
				<Grid className="group-main" item xs={12} md={4}>
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

				{width >= 960 ? (
					<Grid item md={8}>
						<Group partial={true} />
					</Grid>
				) : null}
			</Grid>
		</AppLayout>
	)
}

export default Main
