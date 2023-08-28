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
    vacancy: false,
    availability: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

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
      formData.vacancy,
      formData.availability
    );
    setFormData({
      address: "",
      name: "",
      email: "",
      phone: "",
      vacancy: false,
      availability: "",
    });
    navigate("/showing-calendar/dashboard");
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
              Sign Up as a Host
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
              <label style={{ marginTop: "15px", fontSize: "13px" }}>
                <input
                  type="checkbox"
                  name="vacancy"
                  checked={formData.vacancy}
                  onChange={handleChange}
                  placeholder="number of rooms available"
                />{" "}
                Vacancy?
              </label>
              <br></br>
              <div style={{ marginTop: "15px", fontSize: "13px" }}>
                {" "}
                Capacity{" "}
              </div>
              <input
                style={{ marginTop: "5px", fontSize: "13px" }}
                type="number"
                name="availability"
                placeholder="1"
                value={formData.availability}
                onChange={handleChange}
                min={0}
                max={10}
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