import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import CalendarEventsPage from './components/CalendarEventsPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CalendarEventsPage />
    </ApolloProvider>
  );
}

export default App;
