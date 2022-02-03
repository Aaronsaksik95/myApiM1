require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('../routes');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { applyMiddleware } = require("graphql-middleware");
const { buildFederatedSchema } = require("@apollo/federation");

const messageSchema = require('../apollo/schemas/message.schema');
const movieSchema = require('../apollo/schemas/movie.schema');
const serieSchema = require('../apollo/schemas/serie.schema');
const seasonSchema = require('../apollo/schemas/season.schema');
const episodeSchema = require('../apollo/schemas/episode.schema');
const CategorySchema = require('../apollo/schemas/category.schema');

const movieResolver = require('../apollo/resolvers/movie.resolver');
const serieResolver = require('../apollo/resolvers/serie.resolver');
const seasonResolver = require('../apollo/resolvers/season.resolver');
const episodeResolver = require('../apollo/resolvers/episode.resolver');
const CategoryResolver = require('../apollo/resolvers/category.resolver');

const graphQlServer = new ApolloServer({
    typeDefs: [messageSchema, movieSchema, serieSchema, seasonSchema, episodeSchema, CategorySchema],
    resolvers: [movieResolver, serieResolver, seasonResolver, episodeResolver, CategoryResolver],
    context: ({ req }) => ({
        token: req.headers.token
    })
});
graphQlServer.applyMiddleware({ app, path: '/graphql' });

const port = process.env.PORT;
app.use('*', cors())
// app.use(bodyParser.json());
app.use(function (req, res, next) {
    if (req.originalUrl === '/api/v1/webhook/stripe') {
        next();
    } else {
        express.json()(req, res, next);
    }
});
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