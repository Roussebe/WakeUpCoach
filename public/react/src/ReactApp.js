import {Greetings, Back} from './Utils.js'
import {Ritual, Rituals} from './Rituals.js'
import {Habits} from './Habits.js'
import {AddHabitList} from './AddHabitList.js'

class ReactApp extends React.Component {
  constructor( props ) {
    console.log( "Props : " , props )
    super( props )
    this.state = { show: {layout: "dashboard"}, profile: props.profile, habits: [] }
  }

  onRitualClick( e, ritual ) {
    e.preventDefault()
    console.log( "Click on Ritual" , e, ritual)
    this.setState( { show: {layout: "ritual", ritual: ritual} })
  }

  onBackMainMenu( e ) {
    console.log( "Back" )
    e.preventDefault()
    this.setState( { show: {layout: "dashboard" } } )
  }

  onAddHabitsClick( e, ritual ) {
    e.stopPropagation()
    console.log( "Add Habits to Ritual", e, ritual )
    this.setState( { show: {layout: "add_habits", ritual: ritual }})
  }

  onConfirmAddHabits( e, ritual ) {
    e.stopPropagation()
    console.log( "onConfirmAddHabits Ritual", ritual )
    console.log( "onConfirmAddHabits", this.props)
    console.log( this.state )
  }

  updateHabits( habits ) {
    console.log( "updateHabits" )
    this.setState( { habits: habits } )
  }

  render() {
    let show = this.state.show
    let profile = this.state.profile
    return (
      <div>
      {show.layout === "dashboard" &&
        <div>
        <Greetings name={profile.name} />
        <Rituals rituals={profile.rituals}
                 onRitualClick={ (ritual) => { return (e, r) => { this.onRitualClick( e, r ) } } }
                 onAddHabitsClick={ (ritual) => { return (e, r) => { this.onAddHabitsClick( e, r ) }}}/>
        </div>
      }
      {show.layout === "ritual" &&
        <div>
        <Back onClick={(e) => this.onBackMainMenu(e)}/>
        <Ritual ritual={show.ritual} onClick={(e, ritual) => this.onRitualClick( e, ritual )} />
        <Habits ritual={show.ritual} />
        </div>
      }
      {show.layout === "add_habits" &&
        <div>
        <Back onClick={(e) => this.onBackMainMenu(e)}/>
        <Ritual ritual={show.ritual}
            onAddHabits={(e, ritual) => this.onConfirmAddHabits( e, ritual )}
            onClick={(e, ritual) => this.onRitualClick( e, ritual )} />
        <AddHabitList ritual={show.ritual} habits={this.state.habits}
            updateHabits={(habits) => this.updateHabits( habits )}
        />
        </div>
      }
      </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', async function() {
  let profile = await $.get('/api/basic_profile');
  console.log( "Profile", profile )
  ReactDOM.render( <ReactApp profile={profile} />, document.getElementById('root') )
});
