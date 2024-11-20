import { Context, getAuthInfo } from '../utils/auth';

export interface RobinEvent {
    id: number;
    userId: string;
    title: string;
    start_time: string;
    end_time: string;
    location: string;
}

type TimeArgs = { 
    startDateTime?: string; 
    endDateTime?: string;
    userId: string;
};
  
const mockEvents: RobinEvent[] = [
    {
      id: 1,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      title: 'Weekly Team Meeting',
      start_time: '2023-05-15T14:00:00',
      end_time: '2023-05-15T15:00:00',
      location: 'Conference Room A',
    },
    {
      id: 2,
      userId: "987fcdeb-51a2-43d7-9b56-254415f67890",
      title: 'Product Design Review', 
      start_time: '2023-05-18T10:00:00',
      end_time: '2023-05-18T11:30:00',
      location: 'Virtual',
    },
    {
      id: 3,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      title: 'Client Onboarding Call',
      start_time: '2023-05-22T16:00:00',
      end_time: '2023-05-22T17:00:00',
      location: 'Conference Room B',
    },
    {
      id: 4,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      title: 'Sprint Planning Session',
      start_time: '2023-05-16T09:00:00',
      end_time: '2023-05-16T10:30:00',
      location: 'Conference Room C',
    },
    {
      id: 5,
      userId: "987fcdeb-51a2-43d7-9b56-254415f67890",
      title: 'Tech Stack Discussion',
      start_time: '2023-05-17T13:00:00',
      end_time: '2023-05-17T14:00:00',
      location: 'Virtual',
    },
    {
      id: 6,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      title: 'Code Review Workshop',
      start_time: '2023-05-19T15:00:00',
      end_time: '2023-05-19T16:30:00',
      location: 'Conference Room A',
    },
    {
      id: 7,
      userId: "987fcdeb-51a2-43d7-9b56-254415f67890",
      title: 'Project Status Update',
      start_time: '2023-05-20T11:00:00',
      end_time: '2023-05-20T12:00:00',
      location: 'Virtual',
    },
    {
      id: 8,
      userId: "123e4567-e89b-12d3-a456-426614174000",
      title: 'Team Building Activity',
      start_time: '2023-05-21T14:00:00',
      end_time: '2023-05-21T17:00:00',
      location: 'Office Recreation Area',
    }
];

const GetEventsForUserByDateRangeResolver = (
    _: unknown,
    { startDateTime, endDateTime, userId }: TimeArgs,
    { authenticatedUserId }: Context
): RobinEvent[] => {
    if (!userId) {
        throw new Error('Valid userId is required');
    }

    if (userId !== authenticatedUserId) {
        throw new Error('Can only get events for yourself');
    }

    return mockEvents.filter((event) => {
        const eventDateTime = new Date(event.start_time);
        const start = startDateTime ? new Date(startDateTime) : new Date('1970-01-01');
        const end = endDateTime ? new Date(endDateTime) : new Date('9999-12-31');
        return eventDateTime >= start && eventDateTime <= end && event.userId === userId;
    });
};

const withAuthorization = (
    resolver: typeof GetEventsForUserByDateRangeResolver,
) => (
    _: unknown,
    args: TimeArgs
) => {
    const authenticatedUserContext = getAuthInfo();
    return resolver(_, args, authenticatedUserContext);
};

export default withAuthorization(GetEventsForUserByDateRangeResolver);
