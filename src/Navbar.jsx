import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { auth, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

export default function Navigation() {
  const location = useLocation();
  const [user] = useAuthState(auth);

  const isActive = (path) => {
    return location.pathname === path ? "activeLink" : "";
  };

  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "darkblue",
          color: "white",
          fontWeight: "bold",
          height: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {user && (
          <div style={{ marginLeft: "2rem" }}>
            <Link
              to="/showing-calendar/directory"
              className={`navOption ${isActive("/showing-calendar/directory")}`}
            >
              Directory
            </Link>
          </div>
        )}
        {user && ( 
          <div style={{ marginLeft: "60rem" }}>
            <Link
              to="/showing-calendar/admin-dashboard"
              className={`navOption ${isActive("/showing-calendar/dashboard")}`}
            >
              Dashboard
            </Link>
          </div>
        )}
        {user && ( 
          <div style={{ marginRight: "2rem" }}>
            <Link to="/showing-calendar/admin-login" className="navOption" onClick={logout}>
              Log Out
            </Link>
          </div>
        )}
      </Navbar>
    </div>
  );
}