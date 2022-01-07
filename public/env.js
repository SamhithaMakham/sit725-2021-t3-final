const getProjects = () => {
  $.get('/api/projects',(response) => {
      if(response.statusCode==200){
          addCards(response.data);
      }
  })
}
$(document).ready(function(){
  $('.materialboxed').materialbox();
  $('#formSubmit').click(()=>{
      submitForm();
  })
  getProjects();
  $('.modal').modal();
});
