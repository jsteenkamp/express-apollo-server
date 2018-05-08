import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
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

type Message {
  id: ID!
  text: String
}

input MessageInput{
  channelId: ID!
  text: String
}

type Channel {
   id: ID!                # "!" denotes a required field
   name: String
   messages: [Message]
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.

type Query {
  channels: [Channel]    # "[]" means this is a list of channels
  channel(id: ID!): Channel
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  getFortuneCookie: String @cacheControl(maxAge: 5)
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}

# subscriptions
type Subscription {
  messageAdded(channelId: ID!): Message
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
