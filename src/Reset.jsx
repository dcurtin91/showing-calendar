import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/member-portal/dashboard");
  }, [user, loading]);

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
          <Col
            style={{
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              className="login__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <button
              style={{
                borderRadius: "8px",
                width: "277px",
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
              onClick={() => sendPasswordReset(email)}
            >
              Send password reset email
            </button>

            <div
              style={{
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              Don't have an account?{" "}
              <Link className="navOption2" to="/member-portal/register">
                Register
              </Link>{" "}
              now.
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Reset;
