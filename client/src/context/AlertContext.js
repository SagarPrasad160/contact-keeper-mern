import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const handleAlert = (message, type) => {
    const newAlert = {};
    newAlert.message = message;
    newAlert.type = type;
    newAlert.id = uuidv4();
    setAlerts([...alerts, newAlert]);

    setTimeout(() => {
      removeAlert(newAlert.id);
    }, 5000);
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, handleAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
