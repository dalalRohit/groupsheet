var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

//Database connections
require('./db/db')

//Route files
var indexRouter = require('./routes/index')
var tasksRouter = require('./routes/tasks')
var usersRouter = require('./routes/users')
var groupsRouter = require('./routes/groups')
var queriesRouter = require('./routes/queries')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/tasks', tasksRouter)
app.use('/users', usersRouter)
app.use('/groups', groupsRouter)
app.use('/queries', queriesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404, 'Page not found!'))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	// res.render('error')
	res.send(err.message)
})

module.exports = app

/*
CREATE TABLE "task" (
	task_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
	type VARCHAR(10) NOT NULL,
	title VARCHAR(100) NOT NULL,
	remark VARCHAR(10),
	amount NUMERIC(10,2) NOT NULL,
	user_id UUID REFERENCES "user" (user_id),
	group_id UUID REFERENCES "group" (group_id),
	date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
)
*/
