import axios from 'https://cdn.skypack.dev/axios';

export function Habit( props ) {
  async function validateHabit(e, habit, ritual) {
    axios.post('/api/data', {params : { habit: habit, ritual: ritual } } )
      .then( (response) => { console.log(response)} )
      .catch( (error) => { console.error( error ) });

  }

  const habit = props.habit
  const ritual = props.ritual
  console.log( "Habit", habit.title )
  return (
    <div class="row">
      <div class="col s12 m8">
        <div class="card-content">
            <span class="card-title">{habit.title}</span>
            <small class="align-right"><i class="far fa-circle tiny" /></small>
        </div>
      </div>
    </div>
  )
}


export function Habits( props ) {
  const habits = props.ritual.habits
  const ritual = props.ritual
  console.log( "Habits", habits )

  return ( habits.map( (habit) =>
    <Habit habit={habit} ritual={ritual} key={habit._id} />
  ) )
}
