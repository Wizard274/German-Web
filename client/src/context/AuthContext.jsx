import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    _id: 'local_learner_1',
    name: 'Learner',
    email: 'learner@lingua.ai',
    preferredLanguage: 'German',
    currentLevel: 'A1'
  });

  const updateUserPreferences = (prefs) => {
    setUser((prev) => ({ ...prev, ...prefs }));
  };

  return (
    <AuthContext.Provider value={{ user, loading: false, updateUserPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};
