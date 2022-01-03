import {Greetings, Back} from './Utils.js'
import {Ritual, Rituals} from './Rituals.js'
import {Habits} from './Habits.js'

class ReactApp extends React.Component {
  constructor( props ) {
    console.log( "Props : " , props )
    super( props )
    this.state = { show: {layout: "dashboard"}, profile: props.profile }
  }

  onRitualClick( e, ritual ) {
    e.preventDefault()
    console.log( "Hello" , e, ritual)
    this.setState( { show: {layout: "ritual", ritual: ritual} })
  }

  onBackMainMenu( e ) {
    console.log( "Back" )
    e.preventDefault()
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
                 onRitualClick={ (ritual) => { return (e, r) => { this.onRitualClick( e, r ) } } }/>
        </div>
      }
      {show.layout === "ritual" &&
        <div>
        <Back onClick={(e) => this.onBackMainMenu(e)}/>
        <Ritual ritual={show.ritual} onClick={(e, ritual) => this.onRitualClick( e, ritual )} />
        <Habits ritual={show.ritual} />
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
