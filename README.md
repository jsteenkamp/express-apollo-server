# Express Server

[Express](https://expressjs.com/) server for application API and serving static assets. API uses [GraphQL](http://graphql.org/) using [Apollo](http://dev.apollodata.com/).

The server is setup with [Babel](https://github.com/babel/example-node-server) so we can use the same ES2015+ (ES6) syntax on the front-end and back-end.

## GraphQL
 
With GraphQL and Apollo it is likey that Redux is not required at all. Components can their associated data queries can be collocated and Apollo client can handle caching and batching efficiently.

Apollo can also provide a GraphQL query solution for access local storage and state resulting in a common and consistent way of providing data to components.

GraphQL also makes it easier to create more modular and self-contained components by co-locating data queries within the associated component. This removes the need for redux/redux-saga to handle side-effects and provides additional benefits like caching.  

[Query Components with Apollo](https://dev-blog.apollodata.com/query-components-with-apollo-ec603188c157)
 
[Apollo React Client](http://dev.apollodata.com/react/) and [Apollo Server](http://dev.apollodata.com/tools/graphql-server/index.html) with [Express](https://expressjs.com/)

For development [GraphiQL](https://github.com/graphql/graphiql) is available at `http://localhost:3000/graphiql`


