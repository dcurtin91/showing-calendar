import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, editIt } from "./firebase";
import "./App.css";
import { Button, TextField, Select, MenuItem, FormControl, Typography } from '@mui/material';



function EditActivity(props) {
    const [user] = useAuthState(auth);

    const {activity, activityKey, setEditing, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = user.uid;

    // Set default activity object
    const defaultActivity = {
        name: activity.name,
        type: activity.type,
        date: activity.date,
        time: activity.time,
    }

    const [newActivity, setNewActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setNewActivity({
            ...newActivity, 
            [name]: value});
    }

   

    const isValid = newActivity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        if (user) {
            editIt(uid, newActivity, activityKey);
            setEditing(false);
            // Show alert and hide after 3sec
            setOpenSnackbar(true);
            setSnackbarMsg('Updated Event');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        };
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl >
                <TextField
                style={{ marginTop: '5px' }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Event Title"
                value={activity.name}
                name="name"
                onChange={handleChange}
                />


                <TextField
                style={{ marginTop: '5px' }}
                variant="outlined"
                margin="normal"
                fullWidth
                label="Event Time"
                type="time"
                value={activity.time}
                name="time"
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                }}
                id="event-time-input"
                />

                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={activity.type}
                        style={{minWidth: '100%'}}
                        name="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Showing</MenuItem>
                        <MenuItem value={2}>Block Time as Unavailable</MenuItem>
                    </Select>
                </div>
                
            </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSubmit('add')}
                disabled={isValid}
            >
            Save activity
            </Button>
        </form>
    )
};

export default EditActivity;