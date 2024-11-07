import { ApolloServer, gql } from 'apollo-server';

// Mocked calendar events data
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Weekly Team Meeting',
    date: 'May 15, 2023',
    time: '2:00 PM - 3:00 PM',
    location: 'Conference Room A',
  },
  {
    id: 2,
    title: 'Product Design Review',
    date: 'May 18, 2023',
    time: '10:00 AM - 11:30 AM',
    location: 'Virtual',
  },
  {
    id: 3,
    title: 'Client Onboarding Call',
    date: 'May 22, 2023',
    time: '4:00 PM - 5:00 PM',
    location: 'Conference Room B',
  },
];

// GraphQL schema
const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    date: String!
    time: String!
    location: String!
  }

  type Query {
    GetEventsForUserByDateRange(startDate: String, endDate: String): [Event]!
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    GetEventsForUserByDateRange: (
      _: unknown,
      { startDate, endDate }: { startDate?: string; endDate?: string }
    ): Event[] => {
      // Filter events based on the provided date range
      return events.filter((event) => {
        const eventDate = new Date(event.date);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date('9999-12-31');
        return eventDate >= start && eventDate <= end;
      });
    },
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