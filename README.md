# week4_day5

> Node | Basic Authorization, Autentication & Sessions


## Main points: session management

Para gestionar autorización y sesiones en un Ironlauncher, es necesario:
1. Instalar `bcryptjs`, `express-session` y `connect-mongo`
2. Incluir la clave `SESS_SECRET` en el archivo `.env`
3. Incluir el archivo `session.config.js` en el directorio `configs` y enlazarlo a `app.js` mediante `require("./config/session.config")(app)`

Las dependecias `express-session` y `connect-mongo` ofrecen configuraciones que permiten gestionar sesiones de usuario:
- La propiedad `req.session.currentUser` almacena el usuario identificado.
- El método `req.session.destroy()` cierra la sesión.


## Main points: *custom middlewares*
- Los *middlewares* son procesos intermedios que el servidor asume en cada petición previo a enrutarla.
- Es posible crear middlewares en un archivo independiente, exportarlos e importarlos donde sean necesarios. El método `next()` permite abandonar el middleware y continuar con la ejecución del script:
  ````javascript
  // any-middleware.js
  const myMiddleware = (req, res, next) => {
    console.log("---- MIDDLEWARE EXECUTED -----")
    next()
  }
  module.exports = { myMiddleware }
  ````
- Asimismo, pueden ser incluidos entre rutas o como parte de una ruta, argumentándolo entre el endpoint y el callback:
  ````javascript 
  // any-routes.js
  const { myMiddleware } = require('./../middleware/any-middleware')
  ````
  ````javascript
  app.get('/endpoint', myMiddleware, (req, res, next) => res.render('any-view'))
  ````
  
## Main points: session check
A través de un _custom middleware_  es posible limitar el acceso a ciertas rutas para usuarios no identificados:
```javascript
const isLoggedIn = (req, res, next) => req.session.currentUser ? next() : res.redirect('/forbidden')

module.exports = { isLoggedIn }
```


