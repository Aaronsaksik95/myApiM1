const { gql } = require('apollo-server-express');

module.exports = gql`
    type Episode {
        id: ID
        name: String
        time: Int
        image: String
        video: String
        description: String
        created_at: String
        serie: Serie
        season: Season
    }
    extend type Query {
        getEpisodes: [Episode]
        getEpisode(id:ID):Episode
    }
    extend type Mutation {
        createEpisode(
            id: ID, 
            name: String, 
            time: Int, 
            image: String, 
            video: String, 
            description: String, 
            created_at: String,
            serie: ID,
            season: ID
        ):Episode

        updateEpisode(
            id: ID,
            name: String,
            time: Int,
            image: String,
            video: String,
            description: String,
            created_at: String,
            serie: ID,
            season: ID
        ):Episode
        
        deleteEpisode(id: ID): Message
    }
`
