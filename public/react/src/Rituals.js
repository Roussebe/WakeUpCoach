export class Ritual extends React.Component {
  constructor( props ) {
    super( props )

  }

  editRitual(evt, ritual) {

  }

  render() {
    console.log( "Render Ritual with props" , this.props )
    const ritual = this.props.ritual
    return (
      <div class="white-text text-darken-1 dash-card dash-card-matin" key={ritual.key} onClick={(e)=>this.props.onClick(e, ritual)}>
        <div class="gh-details">
          <div class="gh-title">{ritual.title}</div>
          <div class="gh-time">{ritual.time}</div>
        </div>
        <div class="gh-options">
          <a onClick={(e) => this.props.onClick(e, ritual)}>
              <i class="black-text fas fa-edit" />
          </a>
          <a onClick={(e) => this.props.onAddHabits(e, ritual)}>
              <i class="black-text fas fa-plus" />
          </a>
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
  const onAddHabitsClick = props.onAddHabitsClick

  return rituals.map( (ritual) => {
    return (
        <Ritual ritual={ritual} key={ritual.key} onClick={onRitualClick(ritual)} onAddHabits={onAddHabitsClick(ritual)}/>
    );
  })
}
