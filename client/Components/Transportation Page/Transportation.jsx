// Location, address, and username needs to be passed down
class Transportation extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToTransportation;

    this.state = {
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
  }

  handleRideWith(car) {
    car.riders.push(this.currentProps.username);

    // Rerenders after pushing to array
    this.forceUpdate();
  }

  render() {
    var API_KEY = 'AIzaSyC5jq_3YTRuafmiAx6OJ7fQGPPcWVc26m0';
    var source = 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + this.currentProps.eventAddress;

    return (
      <div className="container" style={{'marginLeft': '400px'}}>

        <div className="transportation-map row">
          <h3>{this.currentProps.eventLocation}</h3>
          <iframe
            width="700" height="300" frameBorder="0" style={{border: 0}}
            src={source} allowFullScreen>
          </iframe>
        </div>

        <div className="volunteer-form row">
          <h3>Rides</h3>
          <form>
            <button>Volunteer as a driver!</button>
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