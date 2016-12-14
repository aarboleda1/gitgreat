// Needed props: Location name, address
class Location extends React.component {
  constructor(props) {
    super(props);
  }

  render() {
    var formattedAddress = this.props.address;
    var source = 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=' + formattedAddress;

    return (
      <div className="location-box">
        <h1>{this.props.location}</h1>
        <div>
          <iframe
            width="400" height="250" frameborder="0" style="border:0"
            src={source} allowfullscreen>
          </iframe>
        </div>
        {this.props.address}
      </div> 
    );
  }
}

window.Location = Location;