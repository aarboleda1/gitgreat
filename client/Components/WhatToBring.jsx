//Child component within the Event Planning component
//Allows users to create a list of items that need to be brought to an event;
import React from 'react';
import $ from 'jquery';
import FeatureNavigation from './FeatureNavigation.jsx';
import Nav from './nav.jsx';

class WhatToBring extends React.Component {
  constructor(props) {
    // props contains current event as featuredEvent
    super(props);
    this.state = {
      itemList: [],
      item: '',
      owner: '',
      cost: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.fetchItems = this.fetchItems.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
      //The event name is passed along to the server via query parameters 
    //so that we can display the itemlist associated with a specific event
    var eventParam = this.props.featuredEvent.name.split(' ').join('_');
    var successHandler = function(data) {
      this.setState({itemList: JSON.parse(data)});
    };
    $.ajax({
      method: 'GET',
      url: '/itemList?eventName=' + eventParam,
      success: successHandler.bind(this)
    });
  }

  handleSubmit(event) {
    //The event name is passed along to the server via query parameters 
    //so that we can post to the itemlistTable associated with a specific event
    var eventParam = this.props.featuredEvent.name.split(' ').join('_');
    $.ajax({
      method: 'POST',
      url: '/itemList?eventName=' + eventParam,
      contentType: 'application/json',
      data: JSON.stringify({ item: 
                            { item: this.state.item,
                              owner: this.state.owner,
                              cost: this.state.cost }
                          }),
      success: this.fetchItems
    });

    this.setState({ item: '', owner: '', cost: '' });

    event.preventDefault();
  }

  handleItemChange(event) {
    this.setState({
      item: event.target.value
    });
  }
  handleOwnerChange(event) {
    this.setState({
      owner: event.target.value
    });
  }
  handleCostChange(event) {
    this.setState({
      cost: event.target.value
    });
  }

  removeItem(remove) {
    var eventParam = this.props.featuredEvent.name.split(' ').join('_');
    $.ajax({
      method: 'DELETE',
      url: '/itemList?eventName=' + eventParam,
      contentType: 'application/json',
      data: JSON.stringify({ item: remove}),
      success: this.fetchItems
    })
  }

  render() {
    return (
    <div className="what-to-bring-wrapper">  
      <div className="nav-container">
        <Nav/>
      </div>

      <div>
        <form className="bringForm" onSubmit={this.handleSubmit}>
        <h3>What To Bring</h3>
          <label>
            Owner:
          <input type='text' name='owner' 
            onChange={this.handleOwnerChange}
          />
          </label>
          <label>
            Item: 
            <input type='text' name='item' 
              onChange={this.handleItemChange}
            />
          </label>
          <label>
            Cost: 
            <input type='text' name='cost' 
              onChange={this.handleCostChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <table className="bringTable">
          <thead>
            <tr>
              <th>Owner</th>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {this.state.itemList.map( (item, index) => 
              <tr key={index} onClick={() => (this.removeItem(item))}>
                <th>{item.owner}</th>
                <th>{item.item}</th>
                <th>{item.cost}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
  }
}

export default WhatToBring;