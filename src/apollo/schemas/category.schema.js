const { gql } = require('apollo-server-express');

module.exports = gql`
    type Category {
        id: ID
        name: String
        created_at: String
    }
    extend type Query {
        getCategories: [Category]
        getCategory(id:ID):Category
    }
    extend type Mutation {
        createCategory(id: ID, name: String, created_at: String):Category
        updateCategory(id: ID, name: String, created_at: String):Category
        deleteCategory(id: ID): Message
    }
`
