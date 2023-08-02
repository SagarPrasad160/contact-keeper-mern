import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const handleAlert = (errors, type) => {
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        const newAlert = {
          message: error.msg,
          type: type,
          id: uuidv4(),
        };

        setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

        setTimeout(() => {
          removeAlert(newAlert.id);
        }, 5000);
      });
    } else {
      const newAlert = {
        message: errors,
        type: type,
        id: uuidv4(),
      };

      setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

      setTimeout(() => {
        removeAlert(newAlert.id);
      }, 5000);
    }
  };

  console.log("alerts", alerts);

  const removeAlert = (id) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, handleAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
