import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BasicDatePicker({ onChange }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (date) {
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const adjustedDate = new Date(date - timezoneOffset);
            onChange(adjustedDate.toISOString().slice(0, 10));
        } else {
            onChange(null);
        }
    };


    return (
        <div>
            <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>
    );
}