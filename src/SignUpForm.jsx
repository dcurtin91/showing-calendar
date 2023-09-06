import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendMessage } from "./firebase";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SignUpForm() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    address: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(
      user,
      formData.address,
      formData.name,
      formData.email,
      formData.phone,
    );
    setFormData({
      address: "",
      name: "",
      email: "",
      phone: "",
    });
    navigate("/showing-calendar/admin-dashboard/");
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
        }}
      >
        <Row>
          <Col
            style={{
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "white",
                width: "100%",
                marginTop: "0px",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              Sign Up
            </Card.Header>
            <form onSubmit={handleSubmit} style={{ padding: "2em" }}>
              <input
                type="text"
                name="address"
                placeholder="property address"
                value={formData.address}
                onChange={handleChange}
                className="login__textBox"
                required
                minLength={1}
              />
              <input
                style={{ marginTop: "15px" }}
                type="text"
                name="name"
                placeholder="contact first and last name"
                value={formData.name}
                onChange={handleChange}
                className="login__textBox"
                required
                minLength={1}
              />
              <input
                style={{ marginTop: "15px" }}
                type="email"
                name="email"
                placeholder="contact email"
                value={formData.email}
                onChange={handleChange}
                className="login__textBox"
                required
                minLength={1}
              />
              <input
                style={{ marginTop: "15px" }}
                type="tel"
                name="phone"
                placeholder="contact phone"
                value={formData.phone}
                onChange={handleChange}
                className="login__textBox"
                minLength={1}
              />
              

              <br></br>
              <br></br>
              <button
                type="submit"
                disabled={formData.name < 1}
                style={{
                  borderRadius: "8px",
                  marginLeft: "94px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export { SignUpForm };