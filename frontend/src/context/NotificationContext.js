// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {message && <div className="notification">{message}</div>}
    </NotificationContext.Provider>
  );
};
