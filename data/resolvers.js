import { PubSub, withFilter } from 'graphql-subscriptions';
import { Author, View, FortuneCookie } from './connectors';

const pubsub = new PubSub();

const channels = [
  {
    id: 1,
    name: 'soccer',
  },
  {
    id: 2,
    name: 'baseball',
  },
];

const resolvers = {
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          return payload.channelId === variables.channelId;
        }
      ),
    },
  },
  Query: {
    channels: () => {
      return channels;
    },
    author(_, args) {
      return Author.find({ where: args });
    },
    allAuthors() {
      return Author.findAll();
    },
    getFortuneCookie() {
      return FortuneCookie.getOne();
    },
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views);
    },
  },
};

export default resolvers;
