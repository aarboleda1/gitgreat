import React from 'react';

class TransportationMap extends React.Component {
  constructor(props) {
    super(props);
    this.currentProps = this.props.propsToTransportationMap;
  }

  render() {
    var API_KEY = 'AIzaSyC5jq_3YTRuafmiAx6OJ7fQGPPcWVc26m0';
    var source = 'https://www.google.com/maps/embed/v1/place?key=' + API_KEY + '&q=' + this.currentProps.eventLocation;

    return (
      <div>
        <h3>{this.currentProps.eventLocation}</h3>
        <iframe
          width="1000" height="400" frameBorder="0" style={{border: 0}}
          src={source} allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default TransportationMap;
