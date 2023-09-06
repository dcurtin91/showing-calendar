import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, addIt } from "./firebase";
import "./App.css";
import { Button, TextField, Select, MenuItem, FormControl, Typography } from '@mui/material';


function AddActivity(props) {
    const [user] = useAuthState(auth);
   

    const {selectedDay, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = user.uid;

    

    // Set query date for updating database
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    // Set default activity object
    const defaultActivity = {
        name: '',
        type: 1,
        date: queryDate,
        time: '00:00',
    }

    const [activity, setActivity] = useState(defaultActivity);

    const handleChange = e => {
        const { name, value } = e.target
        setActivity({
            ...activity, 
            date: queryDate,
            [name]: value});
    }

   

    const isValid = activity.name === '';

    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        if (user) {
            addIt(uid, activity);
            setActivity(defaultActivity);
            // Show notification
            setOpenSnackbar(true);
            setSnackbarMsg('Added activity');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        }
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
                onClick={handleSubmit}
                disabled={isValid}
            >
            Add Event
            </Button>
        </form>
    )
};

export default AddActivity;