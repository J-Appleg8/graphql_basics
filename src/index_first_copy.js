import { GraphQLServer } from 'graphql-yoga';

// GraphQL Scalar Types:
// String, Boolean, Int, Float, ID

////////////////////////////////////////////////////////////////////////////////
// Type Definitions (schema):
// to define the query, we start off with the query name
// then we add a : and define the type that should come back
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

////////////////////////////////////////////////////////////////////////////////
// Resolvers
// the structure of the resolvers object will generally mirror the schema object
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
    name() {
      return 'James Applegate';
    },
    location() {
      return 'Long Beach';
    },
    bio() {
      return 'I own many leather-bound books';
    },
  },
};

////////////////////////////////////////////////////////////////////////////////
// Start Server
// GraphQLServer() expects an object as the argument and two properties
// type definitions & resolvers
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
