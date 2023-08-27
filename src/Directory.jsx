import React, { useState, useEffect } from "react";
import { getMessages, storage } from "./firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Directory = () => {
  const [messages, setMessages] = useState([]);
  const [imageUrlsMap, setImageUrlsMap] = useState({});

  useEffect(() => {
    const unsubscribe = getMessages((newMessages) => {
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isMounted = true; // Flag to track initial mount

    // Initialize an empty object to store image URLs for each message's uid
    const accumulatedUrls = {};

    // Loop through all the messages and fetch image URLs
    Promise.all(
      messages.map((message) => {
        const imagesListRef = ref(storage, `${message.uid}`);
        return listAll(imagesListRef).then((response) => {
          return Promise.all(
            response.items.map((item) => getDownloadURL(item))
          ).then((urls) => {
            accumulatedUrls[message.uid] = urls; // Store image URLs using uid as the key
          });
        });
      })
    ).then(() => {
      if (isMounted) {
        setImageUrlsMap(accumulatedUrls);
      }
    });

    // Cleanup function
    return () => {
      isMounted = false; // Set the flag to false when unmounting
    };
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {messages.map(
        (message, index) =>
          index % 3 === 0 && (
            <Row key={index}>
              {messages.slice(index, index + 3).map((message, subIndex) => (
                <Col key={subIndex}>
                  <Card
                    style={{
                      border: "1px solid black",
                      backgroundColor: "lightgrey",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Card.Body
                      style={{
                        justifyContent: "center",
                        textAlign: "center",
                        lineHeight: "4px",
                      }}
                    >
                      <Card.Title>{message.address}</Card.Title>
                      <Card.Text>{message.name}</Card.Text>
                      <Card.Text>{message.email}</Card.Text>
                      <Card.Text>{message.phone}</Card.Text>
                      <Card.Text>Vacancy: {message.vacancy}</Card.Text>

                      <Card.Text>Capacity: {message.availability}</Card.Text>

                      
                      {imageUrlsMap[message.uid] &&
                        imageUrlsMap[message.uid].map((url, index) => (
                          <img
                            style={{
                              border: "1px solid black",
                              marginBottom: "20px",
                              marginTop: "20px",
                            }}
                            key={index}
                            src={url}
                            alt="Uploaded"
                          />
                        ))}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )
      )}
    </div>
  );
};

export default Directory;