import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, editIt } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


function ActivityList() {
  const [user, loading] = useAuthState(auth);
  const [events, setEvents] = useState([]); // Store an array of events

  const fetchUserData = async () => {
    try {
      if (user) {
        const querySnapshot = await getDocs(collection(db, "properties", user.uid, "events"));
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Check if "activity" exists in the document data
          if (data.activity) {
            const { activity } = data;
            eventData.push(activity); // Push the "activity" object
          }
        });
        setEvents(eventData);
        console.log(eventData);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    fetchUserData();
  }, [user, loading]);


  const deleteActivity = (i) => {
    // Get key of activity in firebase
   const activityKey = Object.keys(activities)[i];
   // Connect to our firebase API
   const emptyActivity = {
        name: null,
        type: null,
        date: null,
        time: null
   };

  editIt(emptyActivity, activityKey);

   // Show notification
   setOpenSnackbar(true);
   setSnackbarMsg('Deleted activity');
   setTimeout(() => {
    setOpenSnackbar(false)
   }, 3000)

   // stop editing
   setEditing(false);
}


return (
  <>
      
      {
          activities === 'not set' || activities === null
              ? <p>No events added yet.</p>
              :
              <TableContainer component={Paper} >
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Type</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Time</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                          Object.values(activities).map((activity, i) => {
                              let {name, type, date, time} = activity;
                              switch(activity.type) {
                                  case 1:
                                      type = "Showing";
                                      break;
                                  case 2:
                                      type = "Block Time as Unavailable";
                                      break;
                                  default:
                                      type = "Not set";
                              };
                              return (
                                  <TableRow key={i}>
                                      <TableCell>{name}</TableCell>
                                      <TableCell>{type}</TableCell>
                                      <TableCell>{date}</TableCell>
                                      <TableCell>{time}</TableCell>
                                      <TableCell>
                                          <Delete
                                              onClick={e => deleteActivity(i)}
                                          />
                                          <Edit
                                              onClick={e => editActivity(activity, i)}
                                              style={{marginLeft:"20px"}}
                                          />
                                      </TableCell>
                                  </TableRow>
                              );
                          })
                      }
                      </TableBody>
                  </Table>
              </TableContainer>
      }
  </>
)
};

export default ActivityList;
