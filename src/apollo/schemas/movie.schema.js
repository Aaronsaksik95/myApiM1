const { gql } = require('apollo-server-express');

module.exports = gql`
    type Movie {
        id: ID
        name: String
        price: Int
        description: String
    }
    type Query {
        getMovies: [Movie]
        getMovie(id:ID):Movie
    }
    type Message {
        message: String
        code: Int
    }
    type Mutation {
        createMovie(id: ID, name: String, price: Int, description: String):Movie
        updateMovie(id: ID, name: String, price: Int, description: String):Movie
        deleteMovie(id: ID): Message
    }
`
