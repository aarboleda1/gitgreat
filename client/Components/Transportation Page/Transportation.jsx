import React from 'react';
import $ from 'jquery';

// Location, address, and username needs to be passed down
class Transportation extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToTransportation;

    this.state = {
      value: '',
      cars: [
        {
          driver: 'CoolPerson',
          seats: 4,
          riders: ['Anton', 'Adam']
        },
        {
          driver: 'AnotherPerson',
          seats: 4,
          riders: ['A', 'B']
        }
      ]
    };

    this.handleRideWith = this.handleRideWith.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleRideWith(car) {
    if (car.riders.length < car.seats) {
      car.riders.push(this.currentProps.username);
    } else {
      alert('This car is full!');
    }

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

  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    var propsToTransportationMap = {
      eventLocation: this.currentProps.eventLocation
    };

    return (
      <div className="container" style={{'marginLeft': '400px'}}>

        <div className="transportation-map row">
          <TransportationMap propsToTransportationMap={propsToTransportationMap} />
        </div>

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