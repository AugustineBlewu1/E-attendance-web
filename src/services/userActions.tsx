import { User } from "./User";

export const setUser = (userData: User) => {
    return {
      type: 'SET_USER',
      payload: userData,
    } as const;
  };
  
  export type UserAction = ReturnType<typeof setUser>;