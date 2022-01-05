export function Greetings( props ) {
  console.log( "Greetings props" , props )
  const name = props.name
  console.log( "Greetings User", name )
  return <h1>Bonjour {name}</h1>
}

export function Back( props ) {
  return (
    <div><a className="btn btn-back white black-text" onClick={props.onClick} href="#"><i className="fas fa-arrow-left" /></a></div>
  )
}

export function Button( { name, backgroundColor, onClick } ) {
  return (
    <div className="input-field center">
    <button className="btn-small add-btn" onClick={onClick} style={{backgroundColor}}>
     {name}
    </button>
    </div>
  )
}
