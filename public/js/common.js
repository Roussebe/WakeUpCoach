let app_context = {}

document.addEventListener('DOMContentLoaded', async function() {
  console.log( "Event Listener" )
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'left'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'right'});

  let profile = await $.get('/api/basic_profile');
  console.log( profile )

  let content = ""

  console.log( $("#rituals").html() )
  for( let r of profile.rituals ) {
    content += `<div class="white-text text-darken-1 pk-contact">
          <div class="contact-image">
            <img src="img/pkcontacts.png" alt="contact thumb">
          </div>
          <div class="contact-details">
            <div class="contact-title">${r.title}</div>
            <div class="contact-numbers">+130902092309</div>
          </div>
          <div class="contact-options">
            <i class="material-icons">call</i>
            <i class="material-icons">delete_outline</i>
          </div>
        </div>`
    }

    $("#rituals").html( content )
});





function ajaxPost( url, data, next ) {
  console.log( url )
  console.log( data )

  $.ajax( {
    type: "POST",
    dataType:"json",
    contentType: "application/json",
    url: url,
    data: JSON.stringify(data)
  })
  .done( next )
  .fail(function(xhr, textStatus, errorThrown) {
    console.log("ERROR: ",xhr.responseText)
    return xhr.responseText;
  })
}
