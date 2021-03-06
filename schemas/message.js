const { gql } = require("apollo-server-express");

module.exports = gql`
  type Message {
    id: ID!
    body: String!
    user: User!
  }

  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(username: ID!, body: String!): Message!
    deleteMessage(id: ID!): Message!
  }

  extend type Subscription {
    messageAdded(username: ID!): Message
  }
`;
