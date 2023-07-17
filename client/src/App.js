import "./App.css";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/Alerts";

import { AlertProvider } from "./context/AlertContext";
import { AuthProvider } from "./context/AuthContext";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <AlertProvider>
          <Router>
            <NavBar />
            <div className="container">
              <Alerts />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </Router>
        </AlertProvider>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;
