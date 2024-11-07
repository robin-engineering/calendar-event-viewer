export interface RobinEvent {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
}

type TimeArgs = { 
    startDateTime?: string; 
    endDateTime?: string 
};
  
const mockEvents: RobinEvent[] = [
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
    {
      id: 4,
      title: 'Sprint Planning Session',
      start_time: '2023-05-16T09:00:00',
      end_time: '2023-05-16T10:30:00',
      location: 'Conference Room C',
    },
    {
      id: 5,
      title: 'Tech Stack Discussion',
      start_time: '2023-05-17T13:00:00',
      end_time: '2023-05-17T14:00:00',
      location: 'Virtual',
    },
    {
      id: 6,
      title: 'Code Review Workshop',
      start_time: '2023-05-19T15:00:00',
      end_time: '2023-05-19T16:30:00',
      location: 'Conference Room A',
    },
    {
      id: 7,
      title: 'Project Status Update',
      start_time: '2023-05-20T11:00:00',
      end_time: '2023-05-20T12:00:00',
      location: 'Virtual',
    },
    {
      id: 8,
      title: 'Team Building Activity',
      start_time: '2023-05-21T14:00:00',
      end_time: '2023-05-21T17:00:00',
      location: 'Office Recreation Area',
    }
];

const GetEventsForUserByDateRangeResolver = (
    _: unknown,
    { startDateTime, endDateTime }: TimeArgs
): RobinEvent[] => {
    // Filter events based on the provided date-time range
    return mockEvents.filter((event) => {
        const eventDateTime = new Date(event.start_time);
        const start = startDateTime ? new Date(startDateTime) : new Date('1970-01-01');
        const end = endDateTime ? new Date(endDateTime) : new Date('9999-12-31');
        return eventDateTime >= start && eventDateTime <= end;
    });
};

const withAuthorization = (
    resolver: typeof GetEventsForUserByDateRangeResolver,
) => (
    _: unknown,
    args: TimeArgs
) => {

    return resolver(_, args);

};

export default withAuthorization(GetEventsForUserByDateRangeResolver);
