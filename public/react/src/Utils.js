export function Greetings( props ) {
  console.log( "Greetings props" , props )
  const name = props.name
  console.log( "Greetings User", name )
  return <h1>Bonjour {name}</h1>
}

export function Back( props ) {
  return (
    <div><a class="btn btn-back white black-text" onClick={props.onClick} href="#"><i class="fas fa-arrow-left" /></a></div>
  )
}
