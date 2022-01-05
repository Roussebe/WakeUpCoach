import axios from 'https://cdn.skypack.dev/axios';


class AddHabit extends React.Component {
  constructor( props ) {
    super(props)
    this.state = { habit: props.habit }
    this.toogleSelection = this.toogleSelection.bind(this)
  }

  toogleSelection( evt ) {
    const habit = {
      title: this.props.habit.title,
      selected: !this.props.habit.selected,
      key: this.props.habit.key
    }

    this.props.onUpdateHabits( habit )

  }

  render() {
    return (
      <tr><td>{this.props.habit.title}</td>
      {!this.props.habit.selected
        ? <td className="green-text bold" onClick={this.toogleSelection}>Ajouter</td>
        : <td className="red-text bold" onClick={this.toogleSelection}>Retirer</td>
      }
      </tr>
    )
  }
}

export class AddHabitList extends React.Component {
  constructor( props ) {
    super(props)

    console.log( "AddHabitList props", props )

    axios.get('/api/list_habits')
      .then( (response) => {
        console.log( "Response to /api/list_habits" , response.data )
        const habits = response.data.habits.map( habit => {
          let selected = props.ritual.habits.find( (h) => { return h._id == habit._id })
          return { key: habit._id, title: habit.title , selected: selected?true:false }
        })
        props.onUpdateHabits( habits )
      } )
      .catch( (error) => { console.error( error ) });
  }

  render() {
    const listItems = this.props.habits.map( habit => { return ( <AddHabit habit={habit} key={habit.key} onUpdateHabits={this.props.onUpdateHabits} /> ) } )
    console.log( "ListItems", listItems)
    return (
      <div id="modal1" >
          <div className="modal-content">
            <table id="modal1_table" className="striped">
              <tbody>
              {listItems}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
          </div>
      </div>
    )
  }
}
