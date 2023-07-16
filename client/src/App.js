import "./App.css";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ContactProvider>
  );
}

export default App;
