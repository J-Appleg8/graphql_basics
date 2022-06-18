import { GraphQLServer } from 'graphql-yoga';

const gql = String.raw;

////////////////////////////////////////////////////////////
// Demo Data
const users = [
  {
    id: '1',
    name: 'James',
    email: 'james@example.com',
    age: 25,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
  },
];

const posts = [
  {
    id: '1',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'GraphQL 200',
    body: 'This is an advanced GraphQL post',
    published: false,
    author: '1',
  },
  {
    id: '3',
    title: 'Programming Music',
    body: '',
    published: true,
    author: '2',
  },
];

const comments = [
  {
    id: '1',
    text: 'This worked well for me. Thanks!',
    author: '1',
    post: '1',
  },
  {
    id: '2',
    text: 'Glad you enjoyed it.',
    author: '2',
    post: '1',
  },
  {
    id: '3',
    text: 'This did not work',
    author: '3',
    post: '2',
  },
  {
    id: '4',
    text: 'Nevermind. I got it to work',
    author: '3',
    post: '2',
  },
];

////////////////////////////////////////////////////////////
// Type Definitions (schema):
const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

////////////////////////////////////////////////////////////
// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
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
