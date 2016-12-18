import React from 'react';
import Nav from '../nav.jsx'
import Calendar from 'rc-calendar';
import FeatureNavigation from '../FeatureNavigation.jsx';
import Moment from 'moment';
import DateList from './DateList.jsx';
import $ from 'jquery';




class PickADate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dates: [],
      date: null
    }
    this.selectNewDate = this.selectNewDate.bind(this);
    this.updateList = this.updateList.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  componentDidMount () {
    this.updateList(); 
  }

  updateList () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/timedate',
      data: this.props.featuredEvent,
      success: function (dates) {
        context.setState({
          dates: dates
        });
      }
    })
  }

  selectNewDate (dateInfo) {
    var date = dateInfo.date();
    var month = dateInfo.month();
    var year = dateInfo.year();
    var time = prompt('Please select a time for ' + month + '/' + date + '/' + year)
    var completeDate = month + '/' + date + '/' + year + ' ' + time;
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/timedate',
      data: this.props.featuredEvent,
      success: function (dates) {
        console.log(data);
        context.updateList()
      }
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
            <h4>Choose a Time and Date For {this.props.featuredEvent.name}!</h4>
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
            onSelect={ (info) => this.selectNewDate(info) }
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
            dateInfo={ this.state.date }
            dates={ this.state.dates }
            handleDateClick={ () => this.handleDateClick }
            featuredEvent={this.props.featuredEvent}
            updateList={this.updateList}
          />
        </div>
      </div>
    ) 
  }
}

export default PickADate;