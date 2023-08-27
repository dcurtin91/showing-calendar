import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    // if (!name) alert("Please enter name");
    registerWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/member-portal/signupform");
  }, [user, loading]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register(email, password);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          border: "1px solid black",
          backgroundColor: "lightgrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2em",
        }}
      >
        <Row>
          <Col>
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
              onKeyDown={handleKeyPress}
            />
            <div
              style={{
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              Already have an account?{" "}
              <Link className="navOption2" to="/member-portal/" tabIndex={-1}>
                Login
              </Link>{" "}
              now.
            </div>
          </Col>
          <Col>
            <input
              type="password"
              className="login__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onKeyDown={handleKeyPress}
            />
          </Col>
          <Col style={{ marginTop: "-10px" }}>
            <button
              style={{
                borderRadius: "8px",
                width: "80px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={register}
            >
              Register
            </button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Register;
