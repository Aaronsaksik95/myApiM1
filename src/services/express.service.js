require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('../routes');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const movieSchema = require('../apollo/schemas/movie.schema');
const movieResolver = require('../apollo/resolvers/movie.resolver');

const graphQlServer = new ApolloServer({
    typeDefs: movieSchema,
    resolvers: movieResolver,
});
graphQlServer.applyMiddleware({ app, path: '/graphql' });
const port = process.env.PORT;
app.use('*', cors())
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);

exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit();
        }
        console.log(`app is running on port ${port}`);
    });
}