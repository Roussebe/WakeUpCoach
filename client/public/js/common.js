let app_context = {}

document.addEventListener('DOMContentLoaded', async function() {
  // nav menu

  // add recipe form
  //const forms = document.querySelectorAll('.side-form');
  //M.Sidenav.init(forms, {edge: 'right'});
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
