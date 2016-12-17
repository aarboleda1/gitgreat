import React from 'react';
import $ from 'jquery';

class TransportationRides extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToTransportationRides;

    this.state = {
      value: '',
      cars: []
    };

    this.handleRideWith = this.handleRideWith.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVolunteer = this.handleVolunteer.bind(this);
  }

  componentDidMount() {
    var successHandler = function(data) {
      this.setState({
        cars: data
      });
    };
    $.ajax({
      method: 'GET',
      url: '/rides',
      data: {
        eventName: this.currentProps.eventName
      },
      success: successHandler.bind(this)
    });
  }

  handleRideWith(car) {
    if (car.riders.length < car.seats) {
      car.riders.push(this.currentProps.username);
    } else {
      alert('This car is full!');
    }

    var carArrayString = JSON.stringify(this.state.cars);
    var putData = {
      eventName: this.currentProps.eventName,
      cars: carArrayString
    };
    $.ajax({
      method: 'PUT',
      url: '/rides',
      data: putData
    });


    // Rerenders after pushing to array
    this.forceUpdate();
  }

  handleVolunteer(e) {
    var newCarArray = this.state.cars;
    var newCar = {
      driver: this.currentProps.username,
      seats: this.state.value,
      riders: []
    };
    newCarArray.push(newCar);

    this.setState({
      value: '',
      cars: newCarArray
    });

    var carArrayString = JSON.stringify(this.state.cars);
    var putData = {
      eventName: this.currentProps.eventName,
      cars: carArrayString
    };
    $.ajax({
      method: 'PUT',
      url: '/rides',
      data: putData
    });

    e.preventDefault();
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="volunteer-form row">
          <h3>Rides</h3>
          <form onSubmit={this.handleVolunteer}>
            <input type="text" onChange={this.handleChange} style={{'width': '250px'}} placeholder="Number of seats you have" />
            <input type="submit" value="Volunteer your ride!" />
          </form>
        </div>

        <div className="rides row">
          {this.state.cars.map( (car) => (
            <div className="col s4">
              <h5>{car.driver}'s Car</h5>
              <button onClick={this.handleRideWith.bind(this, car)}>Ride With</button>
              <p>Number of Seats: {car.seats}</p>
              <p>Current riders: {car.riders.map( (rider) => (<p>{rider}</p>))}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TransportationRides;