const { gql } = require('apollo-server-express');

module.exports = gql`
    type Movie {
        id: ID
        name: String
        time: Int
        image: String
        video: String
        description: String
        year: Int
        like: Int
        created_at: String
        category: [Category]
        actor: [String]
    }
    type Query {
        getMovies(category:ID): [Movie]
        getMovie(id:ID):Movie
        getSearchMovie(name:String): [Movie]
    }
    type Mutation {
        createMovie(
            id: ID, 
            name: String, 
            time: Int, 
            image: String, 
            video: String, 
            description: String, 
            year: Int, 
            like: Int, 
            category: [ID], 
            actor: [String]
        ):Movie
        
        updateMovie(
            id: ID, 
            name: String, 
            time: Int, 
            image: String, 
            video: String, 
            description: String, 
            year: Int, 
            like: Int, 
            created_at: String, 
            category: [ID], 
            actor: [String]
        ):Movie
        deleteMovie(id: ID): Message
    }
`
