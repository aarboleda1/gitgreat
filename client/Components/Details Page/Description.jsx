// Needed props: Event name, event description
var Description = (props) => (
  <div className="description-box">
    <h1>{props.featuredEvent}</h1>
    <div >
      {props.eventDescription}
    </div>
  </div>
);

window.Description = Description;