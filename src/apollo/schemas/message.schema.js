const { gql } = require('apollo-server-express');

module.exports = gql`
    type Message {
        message: String
        code: Int
    }
`
