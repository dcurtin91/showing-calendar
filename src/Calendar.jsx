import React, { useState, useEffect } from "react";
import moment from 'moment';

import { Grid, Snackbar, Paper } from '@mui/material';
import "./App.css";
import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import AddActivity from "./AddActivity";
import EditActivity from "./EditActivity";
import ActivityList from "./ActivityList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { getDocs, collection, query, where, getDoc, doc } from "firebase/firestore";


function Calendar() {
    const [user] = useAuthState(auth);

    const defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
        }

    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);

   
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    
    
    const setSelectedDay = day => {
        setSelected({
                day,
                month: currentMonthNum()
        });
         // Later refresh data
    };
    
    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");
    
    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

    /*** ADD AN ACTIVITY ***/
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState(null);

    /*** ACTIVITY LIST ***/
    const [activities, setActivities] = useState(true);
    //const [activeDays, setActiveDays] = useState([]);

    const fetchData = async () => {
        try {
            const activitiesCollectionRef = collection(db, "properties", user.uid, "events");
            //const queryDate = `${selectedDay.month + 1}-${selectedDay.day}-${selectedDay.year}`;
            const querySnapshot = await getDocs(query(activitiesCollectionRef));
            //, where("date", "==", queryDate)
            
            if (!querySnapshot.empty) {
                // Get the first document in the snapshot
                const docSnapshot = querySnapshot.docs[0];
                const docId = docSnapshot.id;
                
                const docRef = await getDoc(doc(db, "properties", user.uid, "events", docId));
        
                if (docRef.exists()) {
                    const data = docRef.data();
                    setActivities(data);
                    setEditing(false);
                }
            } else {
                // Handle the case where no documents match the query
                console.log("No matching documents found.");
            }
        } catch (err) {
            console.error(err);
        }
    };
    

      useEffect(() => {
        if (!user) return navigate("/showing-calendar/admin-login");
    
        fetchData();
      }, [user]);


      

    /*** EDIT AN ACTIVITY ***/
    const [editing, setEditing] = useState(false);
    const [activity, setActivity] = useState(null);
    const [activityKey, setActivityKey] = useState(null);

    const editActivity = (activity, i) => {
        setActivityKey(Object.keys(activities)[i]);
        setEditing(true);
        setActivity(activity);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody 
                        firstDayOfMonth={firstDayOfMonth}
                        daysInMonth={daysInMonth}
                        currentDay={currentDay}
                        currentMonth={currentMonth}
                        currentMonthNum={currentMonthNum}
                        actualMonth={actualMonth}
                        setSelectedDay={setSelectedDay}
                        selectedDay={selectedDay}
                        weekdays={moment.weekdays()}
                        //activeDays={activeDays}
                    />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper className="paper">
                { editing
                        ?
                            <>
                                <h3>Edit Event on {selectedDay.month + 1}/{selectedDay.day} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        :
                            <>
                                <h3>Add Event on {selectedDay.month + 1}/{selectedDay.day} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={user}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} md={7}>
                <Paper className="paper">
                <h3>Events on {selectedDay.month + 1}/{selectedDay.day}</h3>
                <ActivityList
                    activities={activities}
                    authUser={user}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                    editActivity={editActivity}
                    setEditing={setEditing}
                />
                </Paper>
            </Grid>
            <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={openSnackbar} 
                message={snackbarMsg}
            />
        </Grid>
    )
};

export default Calendar;