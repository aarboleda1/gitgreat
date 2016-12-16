import React from 'react';
import Nav from '../nav.jsx'
import Calendar from 'rc-calendar';
import FeatureNavigation from '../FeatureNavigation.jsx';
import Moment from 'moment';
import DateList from './DateList.jsx';




class PickADate extends React.Component {
  constructor () {
    super()
    this.state = {
      dateList: [1,2,3],
      date: null
    }
    this.getDateInfo = this.getDateInfo.bind(this);
  }

  updateList (date) {
    var date = {date: date  }
    var dateList = this.state.dateList.push(date);
    return dateList
  }

  getDateInfo (dateInfo) {
    var date = dateInfo.date();
    var month = dateInfo.month();
    var year = dateInfo.year();
    var completeDate = month + '/' + date + '/' + year;
    var updatedList = this.updateList(completeDate);
    this.setState({
      dateList: updatedList,
      date: completeDate      
    })
  }
  render () {
    return (
      <div className="pick-a-date-container">
        <div id="outer-container" styles={{height: '100%'}}>
          <FeatureNavigation />
        </div>
        <Nav/>
        <Calendar 
          onSelect={ (info) => this.getDateInfo(info) }
          showDateInput={ false }
          showToday={ false }
        />
        <div className="date-list-container">
          <DateList dateList={ this.state.dateList }/>
        </div>
      </div>
    ) 
  }
}

export default PickADate;