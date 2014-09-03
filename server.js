var connect = require('connect'),
    serveStatic = require('serve-static'),
    port = 3000;

var app = connect();

app.use(serveStatic(__dirname + '/app'));
app.listen(port);

console.log('Server running at http://localhost:' + port);