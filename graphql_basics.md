<style>
th, thead {
    border-top:1pt solid;
    border-bottom: 2px solid;
    border-left: none;
    border-right: none;
}
td {
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 1px solid;
}
</style>

# GraphQL Basics

## <span style="color:lightgreen">Creating a GraphQL API</span>

---

In order to start out using graphql-yoga, the first steps are to set up and define

1. Type Definitions
2. Resolvers

### <span style="color:turquoise">Type Definitions (schema):</span>

Also known as the Application Schema, this is set up and used to define all operations that can be performed on the API and what our custom data types look like.

<br>

![alt text](v_notes_files/schema.jpg 'Title')
<br>

Can then use the 'query' operation thats made available to pull the JSON data that we want from any of the queries

### <span style="color:turquoise">Resolvers:</span>

Application Resolvers are a set of functions that are defined for each of the operations that can be performed on our API

- For example: In the screenshot of the application schema above, a resolver was defined for the 'hello' query, the 'course' query, the 'courseInstructor' query and the 'me' query.
  - Those functions know what to do when that query runs, they know how to get and return the correct data

```graphql
query {
  hello
  course
  courseInstructor
  me {
    id
    name
  }
}
```

### <span style="color:turquoise">First Query Example:</span>

First query overview example using graphql-yoga on localhost:4000

Type Definitions (schema):

- To define the query: start with the query name, then we add a : and define the expected type

Resolvers:

- In general, the structure of the resolvers object is going to mirror the schema object

Start Server:

- `GraphQLServer()` expects an object as the argument
- type definitions & resolvers

```javascript
import { GraphQLServer } from 'graphql-yoga';

// Type Definitions (schema):
const typeDefs = `
    type Query {
        hello: String
    }
`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
  },
};
// Start Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('The server is up!');
});
```

---

<br>

## <span style="color:lightgreen">Scalar Types:</span>

---

Using each of the 5 Scalar types, set up a new set of resources

- Not using ! after a type definition means the returned value can be null

```javascript
// Type Definitions (schema):
const typeDefs = `
    type Query {
       id: ID!
       name: String!
       age: Int!
       employed: Boolean!
       gpa: Float
    }
`;
// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123';
    },
    name() {
      return 'James Applegate';
    },
    age() {
      return 25;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
  },
};
```

---

<br>

## <span style="color:lightgreen">Creating Custom Types:</span>

---
