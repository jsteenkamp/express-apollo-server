// NOTE: using babel for ES2015+ so run with node --require babel-register
import path from 'path';
import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import config from 'config';
import schema from './data/schema';

// config is loaded based on node ENV (from /config via config package)
const APP_PORT = process.env.PORT || config.get('express.port');
const GRAPHQL_ENPOINT = config.get('graphql.path');
const GRAPHIQL_ENPOINT = config.get('graphql.graphiql');
// express app
const app = express();

app.use(compression());

// enable CORS for dev client on different port
app.use('*', cors({ origin: 'http://localhost:3000' }));

// public directory
app.use(express.static(path.join(__dirname, 'public')));

// graphql middleware goes here
app.use(
  GRAPHQL_ENPOINT,
  bodyParser.json(),
  graphqlExpress({ schema })
);

// graphiql UI
app.use(
  GRAPHIQL_ENPOINT,
  graphiqlExpress({
    endpointURL: GRAPHQL_ENPOINT,
    subscriptionsEndpoint: `ws://localhost:${APP_PORT}/subscriptions`,
  })
);

const ws = createServer(app);
ws.listen(APP_PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${APP_PORT}`);
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: ws,
      path: '/subscriptions',
    }
  );
});
