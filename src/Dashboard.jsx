import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import PhotoUpload from "./PhotoUpload";
import Calendar from "./Calendar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(" ");
  const [phone, setPhone] = useState(" ");
  

  const navigate = useNavigate();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const fetchUserData = async () => {
    try {
      const docId = user.uid;
      const docRef = await getDoc(doc(db, "properties", docId));

      if (docRef.exists()) {
        const data = docRef.data();
        setAddress(data.address);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } else {
        console.log("User data not found.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressEdit = () => {
    setIsEditingAddress(true);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleEmailEdit = () => {
    setIsEditingEmail(true);
  };

  const handlePhoneEdit = () => {
    setIsEditingPhone(true);
  };

  const handleUpdate = async () => {
    try {
      const docId = user.uid;
      const docRef = doc(db, "properties", docId);

      await updateDoc(docRef, {
        address: address,
        name: name,
        email: email,
        phone: phone,
      });

      const updatedDoc = await getDoc(docRef);
      const updatedData = updatedDoc.data();
      setAddress(updatedData.address);
      setName(updatedData.name);
      setEmail(updatedData.email);
      setPhone(updatedData.phone);

      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingAddress(false);
      setIsEditingPhone(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/showing-calendar/admin-login");

    fetchUserData();
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
          marginRight: "20px",
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
                backgroundColor: "lightsteelblue",
                width: "100%",
                marginTop: "0px",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              Building Address and Contact Info
            </Card.Header>

            <div className="dash_item">
              {isEditingAddress ? (
                <input
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                />
              ) : (
                <>
                  {address}{" "}
                  <span className="edit-icon" onClick={handleAddressEdit}>
                    &#x270E;
                  </span>
                </>
              )}
            </div>
            <div className="dash_item">
              {isEditingName ? (
                <input type="text" value={name} onChange={handleNameChange} />
              ) : (
                <>
                  {name}{" "}
                  <span className="edit-icon" onClick={handleNameEdit}>
                    &#x270E;
                  </span>
                </>
              )}
            </div>
            <div className="dash_item">
              {isEditingEmail ? (
                <input type="text" value={email} onChange={handleEmailChange} />
              ) : (
                <>
                  {email}{" "}
                  <span className="edit-icon" onClick={handleEmailEdit}>
                    &#x270E;
                  </span>
                </>
              )}
            </div>
            <div className="dash_item">
              {isEditingPhone ? (
                <input type="tel" value={phone} onChange={handlePhoneChange} />
              ) : (
                <>
                  {phone}{" "}
                  <span className="edit-icon" onClick={handlePhoneEdit}>
                    &#x270E;
                  </span>
                </>
              )}
            </div>

            <button
              style={{
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                marginLeft: "112px",
              }}
              onClick={handleUpdate}
            >
              Update
            </button>
          </Col>
        </Row>
      </Card>
      <Card
        style={{
          border: "1px solid black",
          backgroundColor: "lightgrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "lightsteelblue",
            width: "100%",
            marginTop: "0px",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          Image Upload
        </Card.Header>
        <PhotoUpload />
      </Card>
      <Card
        style={{
          border: "1px solid black",
          backgroundColor: "lightgrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "lightsteelblue",
            width: "100%",
            marginTop: "0px",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          Image Upload
        </Card.Header>
        <Calendar />
      </Card>
    </div>
  );
}

export default Dashboard;