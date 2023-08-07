module.exports = app => {

    const indexRoutes = require("./../routes/index.routes")
    app.use("/", indexRoutes)

    const booksRoutes = require("./../routes/books.routes")
    app.use("/libros", booksRoutes)

    const authRoutes = require("./../routes/auth.routes")
    app.use("/", authRoutes)

    const userRoutes = require("./../routes/user.routes")
    app.use("/", userRoutes)
}