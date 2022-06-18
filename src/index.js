import { GraphQLServer } from 'graphql-yoga';

////////////////////////////////////////////////////////////
// Type Definitions (schema):
// Not using ! after a type definition means the returned value can be null
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(a: Float!, b: Float!): Float!
        me: User!
        post: Post!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

////////////////////////////////////////////////////////////
// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}! You are the worst ${args.position}`;
      } else {
        return 'Hello';
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'Mike@example.com',
        age: 28,
      };
    },
    post() {
      return {
        id: 'abc123',
        title: 'GraphQL 101',
        body: 'Basic shit so far with GraphQL',
        published: true,
      };
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
