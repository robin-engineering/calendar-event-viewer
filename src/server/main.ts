import { ApolloServer, gql } from 'apollo-server';
import GetEventsForUserByDateRange from './resolvers/get-events-for-users-by-date-range'

// GraphQL schema
const typeDefs = gql`
  type RobinEvent {
    id: ID!
    title: String!
    start_time: String!
    end_time: String!
    location: String!
  }

  type Query {
    GetEventsForUserByDateRange(startDateTime: String, endDateTime: String): [RobinEvent]!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    GetEventsForUserByDateRange
  },
};

// Create the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});