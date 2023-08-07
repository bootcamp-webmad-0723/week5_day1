require("dotenv").config()

require("./db")

const express = require("express")
const app = express()

require('./config')(app)
require("./config/session.config")(app)         // sesiones

app.locals.appTitle = `Bookstrap D:`

require('./routes')(app)
require("./error-handling")(app)

module.exports = app