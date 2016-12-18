import React from 'react';
import $ from 'jquery';

class DateListEntry extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      votes: this.props.date.votes,
      hasVoted: false
    } 
  }

  increaseVote () {
    // everytime a user updates a date, send it to DB 
    this.sendToDB({
      date: this.props.date,
      votes: this.state.votes,
      name: this.props.featuredEvent.name,
      description: this.props.featuredEvent.description,
      where: this.props.featuredEvent.where
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

  // When the user clicks on an event from the list, update it in the database and get the new list back
  sendToDB (dateInfo) {
    console.log(dateInfo, 'DATEINFO 38 DLE');
    var context = this;
    $.ajax({
      method: 'PUT',
      url: '/timedate',
      data: dateInfo,
      success: function (data) {
        console.log('being updated')
      }
    });
  };

  updateVote () {

  };

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
        {this.props.date.dates}
      </div>
      <div className="votes">
        Number of UpVotes for this Time {this.state.votes}
      </div>
    </div>

    ) 
  }

};



export default DateListEntry;