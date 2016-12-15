//Child component within HomepageApp
//Will receive the eventList in an array as a prop and will create EventListEntries for each event
import React from 'react';
import EventListEntry from './EventListEntry.jsx';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: [],
      completed: []
    };
  }
  componentWillReceiveProps(nextProps) {
    //This function will sort the events in the eventList into two categories: upcoming and deleted
    //The sort logic compares the event date with the current date and checks to see if the event 
    //has already passed.
    console.log(nextProps, 'NEXTPROPS');
    if (nextProps.eventData) {
      var upcoming = [];
      var completed = [];
      nextProps.eventData.forEach((event) => {
        var now = new Date();
        var eventDate = new Date(event.when);
        if (eventDate >= now) {
          upcoming.push(event);
        } else {
          completed.push(event);
        }
      });
      this.setState({upcoming: upcoming, completed: completed});
    }
  }

  render() {
    return (
      <div>
        <div className='featureBody' id='upcoming'> 
          <h2>Upcoming Events</h2>
          {this.state.upcoming.map((event, index) => {
            return ( 
              <EventListEntry 
                key={index} event={event} 
                handleEntryClick={this.props.handleEntryClick}
              />
            );
          })}
        </div>
        <div className='featureBody' id='completed'> 
          <h2>Completed Events</h2>
            {this.state.completed.map((event, index) => {
              return ( 
                <EventListEntry 
                  key={index} event={event} 
                  handleEntryClick={this.props.handleEntryClick}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default EventList;
