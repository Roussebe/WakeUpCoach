import axios from 'https://cdn.skypack.dev/axios';

export class Habit extends React.Component {
  constructor( props ) {
    console.log( "Props : " , props )
    super( props )
    this.state = { habit: props.habit , ritual: props.ritual }
    this.showHabit = this.showHabit.bind(this)
  }

  showHabit(evt, habit, ritual ) {
    console.log("Show habit", habit )
    this.setState( state => ({ habit: { _id: habit._id, title: habit.title, achieved: false } }) )
  }

  tickHabit(evt, habit, ritual) {
    console.log( "Tick habit ", habit )
    let Obj = this
    axios.post('/api/data', {params : { habit: habit, ritual: ritual } } )
      .then( (response) => {
        Obj.setState( { habit: { _id: habit._id, title: habit.title, achieved: true } } )
      } )
      .catch( (error) => { console.error( error ) });
  }

  render() {
    const habit = this.state.habit
    const ritual = this.state.ritual
    return (
      <div className="black-text habit-card">
        <div className="gh-details">
        <div className="gh-subtitle" onClick={(e) => this.showHabit(e, habit, ritual)}>{habit.title}</div>
      </div>
      <div className="gh-options"><a onClick={(e) => this.tickHabit(e, habit, ritual)}>
        {habit.achieved
          ? <i className="green-text far fa-check-circle" />
          : <i className="blue-text far fa-circle" />
        }
      </a></div>
      </div>
    )
  }
}


export function Habits( props ) {
  const habits = props.ritual.habits
  const ritual = props.ritual
  console.log( "Habits", habits )

  return ( habits.map( (habit) =>
    <Habit habit={habit} ritual={ritual} key={habit._id} />
  ) )
}
