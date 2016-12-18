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
    // everytime a user updates a vote, send this information 
      // to the database with these paramters 
    this.sendToDB({
      name: this.props.featuredEvent.name,
      description: this.props.featuredEvent.description,
      where: this.props.featuredEvent.where,
      date: this.props.date.dates,
      votes: this.state.votes,
    }); 
  }

  // When the user clicks on an event from the list, update it in the database 
  //and get the new list back
  sendToDB (dateInfo) {
    var context = this;
    $.ajax({
      method: 'PUT',
      url: '/timedate',
      data: dateInfo,
      success: function (dateInfo) {
        // update view with new vote
        context.setState({
          votes: dateInfo.votes
        })
        context.props.updateList();
      }
    });
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
        Upvotes: 
        <bold>
        {this.state.votes}
        </bold>
      </div>
    </div>

    ) 
  }

};



export default DateListEntry;