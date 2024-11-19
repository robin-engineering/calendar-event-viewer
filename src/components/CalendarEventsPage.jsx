import { useQuery, gql } from '@apollo/client';
import styled from '@emotion/styled';

const EventsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const EventsHeader = styled.h1`
  margin-bottom: 1.5rem;
`;

const ScrollableEvents = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
`;

const EventCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const EventTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const EventDetails = styled.p`
  font-size: 0.8rem;
  color: #888;
  margin-bottom: 0.5rem;
`;

const EventTime = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const GET_EVENTS = gql`
  query GetEventsForUserByDateRange($userId: String!) {
    GetEventsForUserByDateRange(userId: $userId) {
        id
        userId
        title
        start_time
        end_time
        location
    }
}
`;

const CalendarEventsPage = () => {
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: {
      userId: "123e4567-e89b-12d3-a456-426614174000"  // Example UUID
    }
  });

  const formatDateTimeRange = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return `${start.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })} • ${start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })} - ${end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })}`;
  };

  return (
    <EventsContainer>
      <EventsHeader>Upcoming Calendar Events</EventsHeader>
      {loading && <p>Loading...</p>}
      {error && <p>Error!!</p>}
      {data && data.GetEventsForUserByDateRange && (
        <ScrollableEvents>
          {data.GetEventsForUserByDateRange.map((event) => (
            <EventCard key={event.id}>
              <EventTitle>{event.title}</EventTitle>
              <EventTime>
                {formatDateTimeRange(event.start_time, event.end_time)}
              </EventTime>
              <EventDetails>{event.location}</EventDetails>
            </EventCard>
          ))}
        </ScrollableEvents>
      )}
    </EventsContainer>
  );
};

export default CalendarEventsPage;