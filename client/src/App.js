import React, { Component, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

//Components
// import Home from './components/pages/Home'
// import Main from './components/pages/Main'
// import Group from './components/pages/Group'
// import Login from './components/pages/Login'
// import Register from './components/pages/Register'
// import Logout from './components/pages/Logout'

// Lazy loading
const HomeComponent = React.lazy(() => import('./components/pages/Home'))
const MainComponent = React.lazy(() => import('./components/pages/Main'))
const GroupComponent = React.lazy(() => import('./components/pages/Group'))
const LoginComponent = React.lazy(() => import('./components/pages/Login'))
const RegisterComponent = React.lazy(() =>
	import('./components/pages/Register')
)
const LogoutComponent = React.lazy(() => import('./components/pages/Logout'))
class App extends Component {
	render() {
		return (
			<Suspense fallback="Wait">
				<Switch>
					<Route path="/login" exact>
						<LoginComponent />
					</Route>
					<Route path="/register" exact>
						<RegisterComponent />
					</Route>
					<Route path="/app" exact>
						<MainComponent />
					</Route>
					<Route path="/home">
						<HomeComponent />
					</Route>

					<Route path="/group/:id" exact>
						<GroupComponent />
					</Route>
					<Route path="/logout" exact>
						<LogoutComponent />
					</Route>
					<Route path="/">
						<Redirect to="/home" />
					</Route>
				</Switch>
			</Suspense>
		)
	}
}

export default App
