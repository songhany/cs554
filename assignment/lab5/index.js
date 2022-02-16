const { ApolloServer, gql } = require('apollo-server');
// const lodash = require("lodash");
const typeDefs = require('./schema');  // import typeDefs from './schema'
const resolvers = require('./resolvers');


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

