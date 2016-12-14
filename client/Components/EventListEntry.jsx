//Child component within EventList (contained within HomepageApp)
import React from 'react';

var EventListEntry = (props) => (
  <div className="listEntry" onClick={() => props.handleEntryClick(props.event)}>
    <strong>{props.event.name}</strong><br />
    Location: {props.event.where}<br />
    Time: {props.event.when}<br />
  </div>
);

export default EventListEntry;

