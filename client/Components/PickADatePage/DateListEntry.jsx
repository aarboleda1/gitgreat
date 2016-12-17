import React from 'react';
import $ from 'jquery';

class DateListEntry extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      votes: 1,
      hasVoted: false
    } 
  }
  // Allows users to vote for a time 
  increaseVote () {
    console.log(this.props, 'EVENT NAME')
    // everytime a user updates a date, send it to DB 
    this.sendToDB({
      date: this.props.date,
      votes: this.state.votes,
      eventName: this.props.featuredEvent.name,
      description: this.props.featuredEvent.description,
      location: this.props.featuredEvent.where
    }); 

    if(!this.state.hasVoted){
      this.setState((prevVotes)=> {
        return {
          votes: prevVotes.votes + 1,
          hasVoted: !this.state.hasVoted
        };
      })
    }
  }

  // When the user clicks on a new event, send that to the database
  // date will be an object
  sendToDB (dateInfo) {
    console.log(dateInfo, 'DATEINFO 38 DLE');
    $.ajax({
      method: 'POST',
      url: '/timedate',
      data: dateInfo
    });
  }

  render () {
    const dateStyle = {
      'color': '#fff',
      'padding': '1vh',
      'margin': '5px',
      'backgroundColor': '#5A83D3'
    }
    return (
    <div className="date-wrapper" onClick={ () => this.increaseVote() }>
      <div style={ dateStyle } className='date-list-entry'>
        {this.props.featuredEvent.date}
      </div>
      <div className="votes">
        Number of UpVotes for this Time {this.state.votes}
      </div>
    </div>

    ) 
  }

}



export default DateListEntry;