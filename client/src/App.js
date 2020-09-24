import React, { Component } from 'react'
import './styles/main.scss'
import { Switch, Route, Redirect } from 'react-router-dom'

//Components
import Home from './components/pages/Home'
import Main from './components/pages/Main'
import Group from './components/pages/Group'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Logout from './components/pages/Logout'
class App extends Component {
	render() {
		return (
			<Switch>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/app" exact>
					<Main />
				</Route>
				<Route path="/home">
					<Home />
				</Route>

				<Route path="/group/:id" exact>
					<Group />
				</Route>
				<Route path="/logout" exact>
					<Logout />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		)
	}
}

export default App
