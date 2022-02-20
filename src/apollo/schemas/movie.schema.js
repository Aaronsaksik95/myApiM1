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
        superSub: Boolean
        created_at: String
        category: [Category]
        actor: [String]
    }
    type Query {
        getMovies(category:ID, superSub:Boolean): [Movie]
        getMovie(id:ID):Movie
        getMovieNewest: Movie
        getSearchMovie(name:String, superSub:Boolean): [Movie]
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
            superSub: Boolean
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
            superSub: Boolean
            created_at: String, 
            category: [ID], 
            actor: [String]
        ):Movie
        deleteMovie(id: ID): Message
    }
`
