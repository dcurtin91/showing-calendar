import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Directory from "./Directory";
import { SignUpForm } from "./SignUpForm";
import Navigation from "./Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/showing-calendar/" element={<Login />} />
          <Route exact path="/showing-calendar/register" element={<Register />} />
          <Route exact path="/showing-calendar/reset" element={<Reset />} />
          <Route exact path="/showing-calendar/signupform" element={<SignUpForm />} />
          <Route exact path="/showing-calendar/dashboard" element={<Dashboard />} />
          <Route exact path="/showing-calendar/directory" element={<Directory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;