import { GraphQLServer } from 'graphql-yoga';

// GraphQL Scalar Types:
// String, Boolean, Int, Float, ID

////////////////////////////////////////////////////////////
// Type Definitions (schema):
// Not using ! after a type definition means the returned value can be null
const typeDefs = `
    type Query {
       id: ID!
       title: String!
       price: Float!
       releaseYear: Int
       rating: Float
       inStock: Boolean!
    }
`;

////////////////////////////////////////////////////////////
// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123';
    },
    title() {
      return 'Book';
    },
    price() {
      return 19.95;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 4.5;
    },
    inStock() {
      return true;
    },
  },
};

////////////////////////////////////////////////////////////
// Start Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
