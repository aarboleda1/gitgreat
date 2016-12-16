//Parent App within homepage.html
//Allows users to view events, create and view event planning details
import React from 'react';
import EventList from './EventList.jsx';
import EventPlanning from './EventPlanning.jsx';
import Nav from './nav.jsx';
import $ from 'jquery';

class HomepageApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: null,
      planningList: null,
      page: 'homepage',
      featuredEvent: null,
    };
    this.handleEntryClick = this.handleEntryClick.bind(this);
  }

  isPlanningFeaturedEvent() {
    var planList = this.state.planningList;

    for (var i = 0; i < planList.length; i++) {
      // should be id based, 
      // name-based can have security issues
      // i.e create the same event with the same name
      if (planList[i].name === this.state.featuredEvent.name) {
        return true;
      }
    }

    return false;
  }

  componentDidMount() {
    console.log('mounted!!!')
    //sends a get request to the server to populate the eventList array in this component's state,
    //which gets passed as a prop into the Eventlist component
    var attendingEventsHandler = function(data) {
      console.log(data, 'data inside attendingEvents')
      this.setState({eventList: JSON.parse(data)});
    };
    var planningEventsHandler = function(data) {
      this.setState({planningList: JSON.parse(data)});
    };
    $.ajax({
      method: 'GET',
      url: '/attendingEvents?accountName=' + this.props.route.accountName,
      success: attendingEventsHandler.bind(this)
    });
    $.ajax({
      method: 'GET',
      url: '/planningEvents?accountName=' + this.props.route.accountName,
      success: planningEventsHandler.bind(this)
    });
  }

  handleEntryClick(event) {
    console.log(event, 'event');
    this.setState({
      page: 'eventDetails',
      featuredEvent: event
    });
  }

  render() {
    var view;
    //view logic: if an event has been clicked on, then the page should view 
    //the eventDetails page--the EventPlanning component. Otherwise, show the 
    //homepage--the EventList component.
    if (this.state.page === 'homepage') {
      view = 
        (<div>
          <EventList
            eventData={this.state.eventList}
            handleEntryClick={this.handleEntryClick}
          />;
        </div>);
    } else if (this.state.page === 'eventDetails') {
      view = <EventPlanning 
                featuredEvent={this.state.featuredEvent} 
                isPlanning={this.isPlanningFeaturedEvent()}
             />;
    }

    return (
        <div>
          <Nav />
          {view}

        </div>
    );
  }
}

export default HomepageApp;
