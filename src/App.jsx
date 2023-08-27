import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Directory from "./Directory";
import { SignUpForm } from "./signUpForm";
import Navigation from "./Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/member-portal/" element={<Login />} />
          <Route exact path="/member-portal/register" element={<Register />} />
          <Route exact path="/member-portal/reset" element={<Reset />} />
          <Route exact path="/member-portal/signupform" element={<SignUpForm />} />
          <Route exact path="/member-portal/dashboard" element={<Dashboard />} />
          <Route exact path="/member-portal/directory" element={<Directory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;