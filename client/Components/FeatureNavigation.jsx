//Child component within the Event Planning component
//Allows user to navigate between the event planning details

var FeatureNavigation = (props) => (
  // var sidebarClass = this.props.isOpen ? 'sidebar open' : 'sidebar';
  <div className="nav-animate">
  <ul id="slide-out" className="side-nav">
    <li><a href='#' className="wtbBtn" id="firstBtn" value="whatToBringBtn" onClick={(e) => props.changeDisplay(e)}>What To Bring</a></li>
    <li><a href='#' className="reminderBtn" value="reminderBtn" onClick={(e) => props.changeDisplay(e)}>Reminders</a></li>
    <li><a href='#' className="photosBtn" value="photosBtn" onClick={(e) => props.changeDisplay(e)}>Photos</a></li>
    <li><a href='#' className="chatBtn" value="chatBtn" onClick={(e) => props.changeDisplay(e)}>Chatroom (IP)</a></li>    
  </ul>
    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
  </div>
);

window.FeatureNavigation = FeatureNavigation;