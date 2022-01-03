import axios from 'https://cdn.skypack.dev/axios';


function Habit( props ) {


  async function validateHabit(e, habit, ritual) {
    axios.post('/api/data', {params : { habit: habit, ritual: ritual } } )
      .then( (response) => { console.log(response)} )
      .catch( (error) => { console.error( error ) });

  }

  const habit = props.habit
  const ritual = props.ritual
  console.log( "Habit", habit.title )
  return (
    <div class="white-text text-darken-1 habits-card" key={habit.key} onClick={(e)=>validateHabit(e, habit,ritual)}>
      <div class="gh-details">
        <div class="gh-title">{habit.title}</div>
      </div>
      <div class="gh-options">
        <label><input type="checkbox" class="filled-in" id={"name_" + habit.title} /><span/></label>
      </div>
    </div>
  )
}

function Habits( props ) {
  const habits = props.habits
  const ritual = props.ritual
  console.log( "Habits", habits )

  return ( habits.map( (habit) =>
      <Habit habit={habit} ritual={ritual} key={habit._id} />
  ) )
}

class HabitsForm extends React.Component {
  constructor( props ) {
    console.log( "Props" , props )
    super( props )
    this.state = { ritual: props.ritual }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    const habits = this.state.ritual.habits;
    const ritual = this.state.ritual;
    console.log( "HabitForm profile " , habits)
    return (
      <form onSubmit={this.handleSubmit}>
        <Habits habits={habits} ritual={ritual} />
      </form>
    )
  }
}


class Ritual extends React.Component {
  constructor( props ) {
    console.log( props )
    super( props )
    this.showRitualDetails = this.showRitualDetails.bind(this);
  }

  showRitualDetails( e, ritual ) {
    e.preventDefault()
    console.log( "Hello" , e, ritual)
    ReactDOM.render( (
      <div>
      <Ritual ritual={ritual} />
      <HabitsForm ritual={ritual} />
      </div>
    ), document.getElementById('root2') )
    document.getElementById('root').style.display = "none"
  }


  render() {
    console.log( "Render props" , this.props )
    const ritual = this.props.ritual
    return (
      <div class="white-text text-darken-1 dash-card dash-card-matin" key={ritual.key} onClick={(e)=>this.showRitualDetails(e, ritual)}>
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
/*
function Ritual( props ) {
  const ritual = props.ritual
  console.log( "Ritual", ritual )

  function showRitualDetails( e, ritual ) {
    e.preventDefault()
    console.log( "Hello" , e, ritual)
    ReactDOM.render( (
      <div>
      <Ritual ritual={ritual} />
      <HabitsForm ritual={ritual} />
      </div>
    ), document.getElementById('root2') )
    document.getElementById('root').style.display = "none"
  }



  return (
    <div class="white-text text-darken-1 dash-card dash-card-matin" key={ritual.key} onClick={(e)=>showRitualDetails(e, ritual)}>
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
}*/

function Rituals( props ) {
  console.log( props )
  console.log( "Rituals" )
  const rituals = props.rituals;

  return rituals.map( (ritual) => {
    return (
        <Ritual ritual={ritual} key={ritual.key} />
    );
  })
}

function Greetings( props ) {
  console.log( "Greetings props" , props )
  const name = props.name
  console.log( "Greetings User", name )
  return <h1>Bonjour {name}</h1>
}

class App extends React.Component {
  constructor( props ) {
    console.log( "Props : " , props )
    super( props )
    this.state = { step: 0, profile: props.profile }
  }

  render() {
    let step = this.state.step
    let profile = this.state.profile
    let ritual = this.state.ritual
    return (
      <div>
      {step == 0 &&
        <div>
        <Rituals rituals={profile.rituals}/>
        </div>
      }
      {step == 1 &&
        <Habits habits={ritual.habits} />
      }
      </div>
    )
  }
}


document.addEventListener('DOMContentLoaded', async function() {
  let profile = await $.get('/api/basic_profile');
  console.log( "Profile", profile )
  ReactDOM.render( <App profile={profile} />, document.getElementById('root') )
});
