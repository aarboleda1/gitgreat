import React from 'react';
import DateListEntry from './DateListEntry.jsx';

const DateList = ({dates, handleDateClick, dateInfo, featuredEvent, updateList}) => {  
  return (
    <div className="date-list">

      {dates.map((date, index) => {
        return (
          <DateListEntry 
            key={index} 
            date={date}
            handleDateClick={ handleDateClick }
            dateInfo={dateInfo}
            featuredEvent={featuredEvent}
            updateList={updateList}
          />
        )
      })}  
    </div>
  )
  
}
export default DateList;