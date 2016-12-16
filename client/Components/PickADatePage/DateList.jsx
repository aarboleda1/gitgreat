import React from 'react';
import DateListEntry from './DateListEntry.jsx';

const DateList = (props) => {
  
  
  return (
    <div>

      {props.dateList.map((date, index) => {
        return (
          <DateListEntry key={index} date={date}/>
        )
      })}  
    </div>
  )
  
}
export default DateList;