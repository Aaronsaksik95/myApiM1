const app = require('./services/express.service');
const db = require('./services/mongoose.service');

app.start();
db.connectDb();

// heroku login   
// heroku logs --tail --app api-node-aaron-saksik