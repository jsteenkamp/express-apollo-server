import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
# todo - get subscriptions to work
type Subscription {
  messageAdded: [Channel]
}

type Channel {
   id: ID!                # "!" denotes a required field
   name: String
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.

type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String @cacheControl(maxAge: 5)
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
