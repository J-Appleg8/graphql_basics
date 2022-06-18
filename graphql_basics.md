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
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
// Resolvers:
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
  },
};
// Start Server:
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

Using each of the 5 Scalar types, set up a new set of resources:

- String, Boolean, Int, Float, ID

NOTE: Not using ! after a type definition means the returned value can be null

```javascript
// Type Definitions (schema):
const typeDefs = gql`
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;
// Resolvers:
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

For our example use in creating a blogging app, we're going to have custom types for all of the different types of data we have.

For example, custom types to represent each of these fields, which would have their own specified fields:

- User
- Post
- Comment

### <span style="color:turquoise">Building out the User type schema:</span>

Type Definitions (schema):

- Note that we set up an additional type definition in the application schema: one for 'Query' and one for 'User'

Resolvers:

- Note that we created a resolver function for me() since that is what we reference for the Query definition, but we return an object since an object will be returned when User is queried from 'me: User'

```javascript
// Type Definitions (schema):
const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;
// Resolvers:
const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'Mike@example.com',
        age: 28,
      };
    },
  },
};
```

Then we query our new dataset in GraphQL:

```graphql
query {
  me {
    id
    name
    email
    age
  }
}
```

---

<br>

## <span style="color:lightgreen">Operation Arguments:</span>

---

This will allow us to pass data from the client to the server

There are 4 arguments that get passed to all resolver functions:

**parent:**

- Very common and useful when working with relational data
- Ex: if a user has many posts, then the parent argument is used when figuring out how to get the users posts

**args:**

- Contains the operation arguments supplied to the resolver

**context:**

- Typically shortened to 'ctx' - is used for contextual data
- Ex: If a user is logged in, the context might contain the ID of that user so that it can be accessed throughout the application

**info:**

- Contains information about the actual operations that were sent along to the server

### <span style="color:turquoise">Using Resolver args:</span>

Using the 'args' argument in the `greeting()` resolver, we pass a name as an argument into the query call with GraphQL:

```graphql
query {
  greeting(name: "James")
  me {
    id
    name
    email
    age
  }
  post {
    id
    title
    body
    published
  }
}
```

And extract that name in the resolver function from the 'args' argument in order to conditionally return a response based on if a name was provided:

```javascript
// Type Definitions (schema):
const typeDefs = gql`
  type Query {
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;
// Resolvers:
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      console.log(args);
      if (args.name) {
        return `Hello ${args.name}! You are the worst ${args.position}`;
      } else {
        return 'Hello';
      }
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'Mike@example.com',
        age: 28,
      };
    },
  },
};
```

---

<br>

## <span style="color:lightgreen">Working With Arrays:</span>

---

Setting your schema to accept arrays is done by setting the type as an array [], then specifying the expected types that should be in the array

```javascript
// Type Definitions (schema):
const typeDefs = gql`
  type Query {
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
  }
`;
// Resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
    },
  },
};
```
