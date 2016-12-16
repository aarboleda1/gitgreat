import React from 'react';

class DateListEntry extends React.Component {
  constructor ({date, handleDateClick}) {
    super ({date, handleDateClick})
    this.state = {
      votes: 1
    } 
  }

  render () {
    return (
    <div className="date-wrapper">
      <div
        onClick={() => handleDateClick(date) }
        className='date-list-entry'
      >
      {date}
    </div>
      <div className="votes">
        Number of UpVotes for this Event {votes}
      </div>
  </div>


    ) 
  }

}



export default DateListEntry;