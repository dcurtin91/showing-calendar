import React from 'react';
import moment from 'moment';

import { Grid } from '@mui/material';
import "./App.css";
import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";


function Calendar() {

    const [user] = useAuthState(auth);

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
                        
                    />
            </Grid>
        </Grid>
    )
};

export default Calendar;