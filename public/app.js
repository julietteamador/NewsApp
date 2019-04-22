// Grab the news as a json
$.getJSON("/news", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  // Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#summary").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/news/" + thisId
  })

    // With that done, add the note information to the page
    .then(function(data) {
        console.log(data);
        // The title of the article
        $("#summary").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#summary").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#summary").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#summary").append("<button data-id='" + data._id + "' id='savesum'>Save Summary</button>");
  
        // If there's a note in the article
        if (data.summary) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.summary.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.summary.body);
        }
      });
  });
  