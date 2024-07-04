// Usercontext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  user_id: string;
  username: string;
  email: string;
  phonenumber: string;
  empId: string;
  shift: string;
  usertype: string;
  created_at: string;
}

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
}

const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children, user }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
