import React, { createContext, useContext, useState } from 'react';

// Define the shape of your user data
export interface User {
  username: string;
  email: string;
  role: string;  // Role field
  birthDate: string | null;
  profileImage: string | null;
  quiz_amount: number;      // Field to track the number of quizzes submitted
}

// Create a context with a default value
const UserContext = createContext<{ user: User | null; setUser: React.Dispatch<React.SetStateAction<User | null>> } | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
