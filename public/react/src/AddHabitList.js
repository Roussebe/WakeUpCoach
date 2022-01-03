import axios from 'https://cdn.skypack.dev/axios';


class AddHabit extends React.Component {
  constructor( props ) {
    super(props)
    this.state = { habit: props.habit }
    this.toogleSelection = this.toogleSelection.bind(this)
  }

  toogleSelection( evt ) {
    this.setState( {
      habit: {
        title: this.state.habit.title,
        selected: !this.state.habit.selected,
      }
    })
  }

  render() {
    return (
      <tr><td>{this.state.habit.title}</td>
      {!this.state.habit.selected
        ? <td class="green-text bold" onClick={this.toogleSelection}>Ajouter</td>
        : <td class="red-text bold" onClick={this.toogleSelection}>Retirer</td>
      }
      </tr>
    )
  }
}

export class AddHabitList extends React.Component {
  constructor( props ) {
    super(props)
    console.log( "AddHabitList props", props )
    this.state = {habits: props.habits }
    let Obj = this
    axios.get('/api/list_habits')
      .then( (response) => {
        console.log( "Response" , response.data )
        console.log( props )
        const habits = response.data.habits.map( habit => {
          let selected = props.ritual.habits.find( (h) => { return h._id == habit._id })
          return { title: habit.title , selected: selected?true:false }
        })

        props.updateHabits( habits )

      } )
      .catch( (error) => { console.error( error ) });
  }


  render() {
    const listItems = this.props.habits.map( habit => { return ( <AddHabit habit={habit} key={habit._id}/> ) } )
console.log( "ListItems", listItems)
    return (
      <div id="modal1" >
          <div class="modal-content">
            <table id="modal1_table" class="striped">
              <tbody>
              {listItems}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
          </div>
      </div>
    )
  }
}
