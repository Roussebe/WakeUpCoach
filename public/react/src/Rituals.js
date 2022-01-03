export class Ritual extends React.Component {
  constructor( props ) {
    super( props )
  }

  render() {
    console.log( "Render props" , this.props )
    const ritual = this.props.ritual
    return (
      <div class="white-text text-darken-1 dash-card dash-card-matin" key={ritual.key} onClick={(e)=>this.props.onClick(e, ritual)}>
        <div class="gh-details">
          <div class="gh-title">{ritual.title}</div>
          <div class="gh-time">{ritual.time}</div>
        </div>
        <div class="contact-options">
          <i class="material-icons">add</i>
          <i className="material-icons">delete_outline</i>
        </div>
      </div>
    );
  }
}



export function Rituals( props ) {
  console.log( props )
  console.log( "Rituals" )
  const rituals = props.rituals;
  const onRitualClick = props.onRitualClick

  return rituals.map( (ritual) => {
    return (
        <Ritual ritual={ritual} key={ritual.key} onClick={onRitualClick(ritual)}/>
    );
  })
}
