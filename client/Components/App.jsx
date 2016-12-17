//Parent App within homepage.html
//Allows users to view events, create and view event planning details
import React from 'react';
import EventList from './EventList.jsx';
import EventPlanning from './EventPlanning.jsx';
import CreateEventApp from './CreateEventApp.jsx';
import Login from './Login.jsx';
import Nav from './nav.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      planningList: [],
      page: 'login',
      featuredEvent: null,
      accountName: '',
      loggedIn:false
    };
    this.changePage = this.changePage.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.updateEvents = this.updateEvents.bind(this);
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

  updateEvents() {
    // back to back asynchronous,
    // order of eventlist/planning list update doesn't matter 
    $.ajax({
      method: 'GET',
      url: '/attendingEvents?accountName=' + this.state.accountName,
      success: function(data) {
        this.setState({eventList: JSON.parse(data)});
      }.bind(this)
    });
    $.ajax({
      method: 'GET',
      url: '/planningEvents?accountName=' + this.state.accountName,
      success: function(data) {
        this.setState({planningList: JSON.parse(data)});
      }.bind(this)
    });
  }

  // utility function for child components (CreateEventApp) 
  // to change App view from below
  changePage(page) {
    this.setState({
      page: page
    });
  }

  handleLogin(accountName) {
    // fetch events for the accountName 
    // set currentUser to the accountName
    this.setState({
      accountName: accountName,
      loggedIn: true
    }, () => {
      this.updateEvents();
      this.changePage('events');
    });
  }

  handleEntryClick(event) {
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
    if (this.state.page === 'login' && !this.state.loggedIn) {
      view = 
        (<Login 
          handleLogin={this.handleLogin}
        />);
    } else if (this.state.page === 'events') {
      view = 
        (<EventList
          attending={this.state.eventList}
          planning={this.state.planningList}
          handleEntryClick={this.handleEntryClick}
        />);
    } else if (this.state.page === 'eventDetails') {
      view = 
        (<EventPlanning 
          featuredEvent={this.state.featuredEvent} 
          isPlanning={this.isPlanningFeaturedEvent()}
          accountName={this.state.accountName}
        />);
    } else if (this.state.page === 'createEvent') {
      view = 
        (<CreateEventApp 
          changePage={this.changePage}
          updateEvents={this.updateEvents}
          accountName={this.state.accountName}
        />);
    }

    return (
        <div>
          <Nav changePage={this.changePage}/>
          {view}
        </div>
    );
  }
}

export default App;
