export type Context = { 
    authenticatedUserId: string;
};

export const getAuthInfo = () => {

    const authenticatedUserContext : Context = {
      authenticatedUserId: '123e4567-e89b-12d3-a456-426614174000'
    };
    
    return authenticatedUserContext;
};
