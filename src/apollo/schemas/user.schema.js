const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: ID
        email: String
        password: Int
    }
    type Query {
        getUsers: [User]
        getUser(id:ID): User
    }
    type Message {
        message: String
        code: Int
    }
    type Mutation {
        createUser(id: ID, name: String, price: Int, description: String):Movie
        updateUser(id: ID, name: String, price: Int, description: String):Movie
        deleteUser(id: ID): Message
    }
`
