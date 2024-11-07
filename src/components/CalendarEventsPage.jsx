import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';

const EventsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const EventCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const EventDetails = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const GET_EVENTS = gql`
  query GetEventsForUserByDateRange {
    GetEventsForUserByDateRange {
        id
        title
        date
        time
        location
    }
}

`;

const CalendarEventsPage = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  return (
    <EventsContainer>
      <h2>Upcoming Calendar Events</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error!!</p>}
      {data && data.GetEventsForUserByDateRange && 
      data.GetEventsForUserByDateRange.map((event) => (
        <EventCard key={event.id}>
          <EventTitle>{event.title}</EventTitle>
          <EventDetails>{event.date}</EventDetails>
          <EventDetails>{event.time}</EventDetails>
          <EventDetails>{event.location}</EventDetails>
        </EventCard>
      ))}
    </EventsContainer>
  );
};

export default CalendarEventsPage;