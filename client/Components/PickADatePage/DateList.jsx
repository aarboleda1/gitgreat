import React from 'react';
import DateListEntry from './DateListEntry.jsx';

const DateList = ({dates, handleDateClick, dateInfo, featuredEvent}) => {  
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
            dateInfo={dateInfo}
            featuredEvent={featuredEvent}
          />
        )
      })}  
    </div>
  )
  
}
export default DateList;