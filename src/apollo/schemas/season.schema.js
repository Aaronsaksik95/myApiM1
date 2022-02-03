const { gql } = require('apollo-server-express');

module.exports = gql`
    type Season {
        id: ID
        name: String
        description: String
        year: Int
        created_at: String
        serie: Serie
        episode: [Episode]
    }
    extend type Query {
        getSeasons: [Season]
        getSeason(id:ID):Season
    }
    extend type Mutation {
        createSeason(
            id: ID, 
            name: String, 
            description: String, 
            year: Int, 
            created_at: String, 
            serie: ID,
            episode: [ID]
        ):Season

        updateSeason(
            id: ID, 
            name: String, 
            description: String, 
            year: Int, 
            created_at: String, 
            serie: ID,
            episode: [ID]
        ):Season
        
        deleteSeason(id: ID): Message
    }
`
