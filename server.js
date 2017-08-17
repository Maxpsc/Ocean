require("babel-core/register");
const app = require('./server/app');

const port = process.env.SERVER_PORT || '3000';
app.listen(port);
console.log('Server begins at port: ' + port + ' is listening~');
