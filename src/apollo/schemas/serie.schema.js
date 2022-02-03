const { gql } = require('apollo-server-express');

module.exports = gql`
    type Serie {
        id: ID
        name: String
        image: String
        description: String
        like: Int
        created_at: String
        category: [Category]
        actor: [String]
        season: [Season]
    }
    extend type Query {
        getSeries(category:ID): [Serie]
        getSerie(id:ID):Serie
        getSearchSerie(name:String): [Serie]
    }
    extend type Mutation {
        createSerie(
            id: ID, 
            name: String, 
            image: String, 
            description: String, 
            like: Int, 
            created_at: String, 
            category: [ID], 
            actor: [String]
            season: [ID]
        ):Serie

        updateSerie(
            id: ID, 
            name: String, 
            image: String, 
            description: String, 
            like: Int, 
            created_at: String, 
            category: [ID], 
            actor: [String], 
            season: [ID]
        ):Serie
        
        deleteSerie(id: ID): Message
    }
`
