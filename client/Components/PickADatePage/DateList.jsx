import React from 'react';
import DateListEntry from './DateListEntry.jsx';

const DateList = ({dates, handleDateClick}) => {  
  return (
    <div className="date-list">
      <strong>
        Your Times
      </strong>
      {dates.map((date, index) => {
        return (
          <DateListEntry 
            key={index} 
            date={date}
            handleDateClick={ handleDateClick }
          />
        )
      })}  
    </div>
  )
  
}
export default DateList;