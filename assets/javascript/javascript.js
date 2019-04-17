
var memes = ["salt bae", "dab", "spongebob"];
console.log(memes)

function renderButtons() {

  $("#button-bar").empty();

  for (var i = 0; i < memes.length; i++) {

    var newButton = $("<button>").text(memes[i]);

    newButton.addClass("btn btn-secondary meme");
    newButton.attr("data-meme", memes[i]);
    
    $("#button-bar").append(newButton);

  }
}

$("#add-meme").on("click", function (event) {
  event.preventDefault();
  var userInput = $("#meme-input").val().trim();
  
  if (!memes.includes(userInput) && userInput !== "") {
    memes.push(userInput);
  }
  renderButtons();
  $("#meme-input").val("");

});


function displayMeme() {

  $("#meme-view").empty();

  var meme = $(this).attr("data-meme");



  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    meme + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {


      var results = response.data;


      for (var i = 0; i < results.length; i++) {
        var memeDiv = $("<div class='meme-div'>");


        memeDiv.html(`
        <p>Rating: ${results[i].rating}</p>
        <img src='${results[i].images.fixed_height_still.url}' data-still='${results[i].images.fixed_height_still.url}' data-animate='${results[i].images.fixed_height.url}' data-state='still' class='gif'>
        `);       


          $("#meme-view").prepend(memeDiv);
        
      }
    });
};

$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }



})


$(document).on("click", ".meme-btn", displayMeme);

renderButtons();

        //   create a function that can clear the existing gifs
// create if statement that can code the starting and stoping of a gif. 




