
$(function() {


function loadExisting() {

  var existingTag = $("#existing");
  existingTag.html("");

  $.get("/v0/feedback")
    .done(function(data) {
      data.forEach(function(item) {
        existingTag.html("<li>" + item.contents + "</li>" + existingTag.html());
      });
    });  
}

if(_loadFeedback)
  loadExisting();

function display(text) {
  $("#output").text(text);
}

$("#submit").click(function() {
  
  var text = $("#feedback").val();
  console.log("text: " + text);

  if(text.length < 2) {
    display("Please enter some feedback.");
  }
  else {

    console.log("else");
    $.post("/v0/feedback", {contents: text, input_interface: 0})
      .done(function(data) {
        display("Feedback submitted!");
        //loadExisting();
        $("#submit").prop("disabled", true);
      })
  }
  
});

});