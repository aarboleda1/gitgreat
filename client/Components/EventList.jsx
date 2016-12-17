//Child component within HomepageApp
//Will receive the eventList in an array as a prop and will create EventListEntries for each event
import React from 'react';
import EventListEntry from './EventListEntry.jsx';

class EventList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='featureBody' id='upcoming'> 
          <h2>Attending</h2>
          {this.props.attending.map((event, index) => {
            return ( 
              <EventListEntry 
                key={index} event={event} 
                handleEntryClick={this.props.handleEntryClick}
              />
            );
          })}
        </div>
        <div className='featureBody' id='completed'> 
          <h2>Planning</h2>
            {this.props.planning.map((event, index) => {
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
