export interface RobinEvent {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
}
  
const events: RobinEvent[] = [
    {
      id: 1,
      title: 'Weekly Team Meeting',
      start_time: '2023-05-15T14:00:00',
      end_time: '2023-05-15T15:00:00',
      location: 'Conference Room A',
    },
    {
      id: 2,
      title: 'Product Design Review', 
      start_time: '2023-05-18T10:00:00',
      end_time: '2023-05-18T11:30:00',
      location: 'Virtual',
    },
    {
      id: 3,
      title: 'Client Onboarding Call',
      start_time: '2023-05-22T16:00:00',
      end_time: '2023-05-22T17:00:00',
      location: 'Conference Room B',
    },
  ];

const GetEventsForUserByDateRangeResolver = (
    _: unknown,
    { startDateTime, endDateTime }: { startDateTime?: string; endDateTime?: string }
): RobinEvent[] => {
    // Filter events based on the provided date-time range
    return events.filter((event) => {
        const eventDateTime = new Date(event.start_time);
        const start = startDateTime ? new Date(startDateTime) : new Date('1970-01-01');
        const end = endDateTime ? new Date(endDateTime) : new Date('9999-12-31');
        return eventDateTime >= start && eventDateTime <= end;
    });
};

export default GetEventsForUserByDateRangeResolver;