import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import "./App.css";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function ActivityList(props) {
    const [user] = useAuthState(auth);
    const uid = user.uid;
    const {activities, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing} = props;

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

       props.firebase.updateActivity(uid, emptyActivity, activityKey);

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
                                    let {name, type, time} = activity;
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