import axios from 'https://cdn.skypack.dev/axios';


import {Greetings, Back, Button} from './Utils.js'
import {Ritual, Rituals} from './Rituals.js'
import {Habits} from './Habits.js'
import {AddHabitList} from './AddHabitList.js'


class ReactApp extends React.Component {
  constructor( props ) {
    super( props )
    this.state = { show: {layout: "dashboard"},
                   profile: props.profile,
                   habits: [] }
  }

  onRitualClick( e, ritual ) {
    e.preventDefault()
    this.setState( { show: {layout: "ritual", ritual: ritual} })
  }

  onBackMainMenu( e ) {
    e.preventDefault()
    this.setState( { show: {layout: "dashboard" } } )
  }

  onAddHabitsClick( e, ritual ) {
    e.stopPropagation()
    this.setState( { show: {layout: "add_habits", ritual: ritual }})
  }

  onUpdateHabits( habits ) {
    if( Array.isArray( habits ) ) {
      console.log( "Update all habit list" )
      this.setState( { habits: habits } )
    } else {
      console.log( "Update a single habit" )
      const newHabits = this.state.habits.slice()
      const updIdx = newHabits.findIndex( (h) => h.key == habits.key )
      newHabits[updIdx] = habits
      this.setState( { habits: newHabits } )
    }
  }

  onConfirmAddHabits( e, ritual ) {
    e.stopPropagation()

    const request = this.state.habits
      .filter( (h) => h.selected )
      .map( (h) => {
        return { _id: h.key, title: h.title }
      })

    axios.post('/rituals/add_habit/' + ritual.key, {result : request} )
      .then( (response) => { } )
      .catch( (error) => { console.error( error ) });

    this.setState( { show: {layout: "dashboard" } } )
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
        <Ritual ritual={show.ritual} updators={this.updators}
            onAddHabits={(e, ritual) => this.onConfirmAddHabits( e, ritual )}
            onClick={(e, ritual) => this.onRitualClick( e, ritual )} />
        <AddHabitList ritual={show.ritual} habits={this.state.habits}
            onUpdateHabits={(habits) => this.onUpdateHabits( habits )}
        />
        <Button name="Confirm" backgroundColor="blue" />
        </div>
      }
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  let profile = await $.get('/api/basic_profile');
  console.log( "Profile", profile )
  ReactDOM.render( <ReactApp profile={profile} />, document.getElementById('root')
  )
});
