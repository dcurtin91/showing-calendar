import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const checkUserDocs = async () => {
        //const collectionName = `${user.uid}`;
        const querySnapshot = await getDocs(collection(db, "properties"));
        if (!querySnapshot.empty) {
          navigate("/member-portal/dashboard");
        } else {
          navigate("/member-portal/signupform");
        }
      };

      checkUserDocs();
    }
  }, [user, loading, navigate]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      logInWithEmailAndPassword(email, password);
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

            <div style={{ marginTop: "10px", display: "flex" }}>
              <Link
                className="navOption2"
                to="/member-portal/reset"
                tabIndex={-1}
              >
                Forgot Password
              </Link>
            </div>
            <div
              style={{
                fontSize: "15px",
                marginTop: "5px",
                whiteSpace: "nowrap",
              }}
            >
              Don't have an account?{" "}
              <Link
                className="navOption2"
                to="/member-portal/register"
                tabIndex={-1}
              >
                Register
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
              }}
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
