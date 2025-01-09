const authRoute = require('./auth.routes');
const siteRoute = require('./site.routes');

function route(app){
    app.use('/', authRoute);
    app.use('/', siteRoute);
}

module.exports = route;