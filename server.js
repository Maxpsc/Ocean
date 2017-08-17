const app = require('./server/app');
// const debug = require('debug')('microblog:server');

const port = process.env.SERVER_PORT || '3000';
app.listen(port);
console.log('Server begins at port: ' + port);
console.log('Server is listening~~');
