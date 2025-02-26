import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export interface User {
  username: string;
  email: string;
  role: string;
  birthDate: string | null;
  quiz_amount: number;
}

const UserContext = createContext<{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> } | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
      const token = Cookies.get('auth_token'); 
      const role = Cookies.get('user_role'); 

      if (token && role) {
          setUser({ username: "", email: "", role, birthDate: null, quiz_amount: 0 });
      } else {
          setUser(null);
      }
  }, []);

  return (
      <UserContext.Provider value={{ user, setUser }}>
          {children}
      </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
