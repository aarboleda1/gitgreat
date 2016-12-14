//Child component contained within HomepageApp
//Contains the event planning navigation bar

class EventPlanning extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tab: false
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }
  
  changeDisplay(e) {
    console.log(e.target.className);
    this.setState({
      tab: e.target.className
    });
  }

  openNav() {
    document.getElementById("slide-out").style.width = "285px";
    console.log(document.getElementById("slide-out").style.width);
  }

  closeNav() {
    console.log('CLICKED')
    document.getElementById("slide-out").style.width = "0";
  }


  render () {
    var view;
    if (this.state.tab === 'wtbBtn') {
      view = <WhatToBring featuredEvent={this.props.featuredEvent}/>;
    } else if (this.state.tab === 'activitiesBtn') {
      view = <Activities />;
    } else if (this.state.tab === 'reminderBtn') {
      view = <Reminders featuredEvent={this.props.featuredEvent}/>;
    } else if (this.state.tab === 'photosBtn') {
     view = <Photos uploadFile={this.uploadFile} />;
    }
    return (
      <div>      
        {/*<h2 className="eventHeader">{this.props.featuredEvent.name} | {this.props.featuredEvent.where} | {this.props.featuredEvent.when}</h2>*/}
        <FeatureNavigation openNav={this.openNav} closeNav={this.closeNav} changeDisplay={this.changeDisplay} />
        {view}
      </div>     
    ) 
  }


}

// this is where to display the nav bar

window.EventPlanning = EventPlanning;

