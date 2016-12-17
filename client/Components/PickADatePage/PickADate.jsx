import React from 'react';
import Nav from '../nav.jsx'
import Calendar from 'rc-calendar';
import FeatureNavigation from '../FeatureNavigation.jsx';
import Moment from 'moment';
import DateList from './DateList.jsx';




class PickADate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: [],
      date: null
    }
    this.getDateInfo = this.getDateInfo.bind(this);
    this.updateList = this.updateList.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  updateList (date) {
    // var date = {date: date }
    this.state.dates.push(date);
    var newList = this.state.dates;
    this.setState({
      dates: newList
    })
  }

  getDateInfo (dateInfo) {
    var date = dateInfo.date();
    var month = dateInfo.month();
    var year = dateInfo.year();
    var time = prompt('Please select a time for ' + month + '/' + date + '/' + year)
    console.log(time);
    var completeDate = month + '/' + date + '/' + year + ' ' + time;
    var updatedList = this.updateList(completeDate);
    this.setState({
      date: completeDate      
    })
  }

  handleDateClick () {
    console.log('clicked')
  }

  render () {
    const listStyle = {
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'center',
    }
    const titleStyle = {
      'display': 'flex',
      'flexDirection': 'row',
      'justifyContent': 'center'
    }
    return (
      <div className="pick-a-date-container">

          <div style={ titleStyle }>
            <h4>Choose a Time and Date For This Event!</h4>
          </div>
          <div style={titleStyle}className="instruction-container">
            <ul>
              <h5>How This Works</h5>
              <li>1) Choose a Date, enter a time that works for You</li>
              <li>1) Below are 5 most popular times by your group</li>
              <li>1) To suggest a new time, click on a date and submit the date!</li>
            </ul>
          </div>

        <div id="calendar-container">
          <Calendar 
            onSelect={ (info) => this.getDateInfo(info) }
            showToday={ false }
            showDateInput={ false }
          />
        </div>
        <div 
          style={ listStyle }
          className="date-list-container"
        >
        <strong>Most Popular Dates for this Event</strong>
          <DateList             
            dates={ this.state.dates }
            handleDateClick={ () => this.handleDateClick }
          />
        </div>
      </div>
    ) 
  }
}

export default PickADate;