
var memes = ["salt bae", "dab", "spongebob"];
console.log(memes)

function renderButtons() {

  $("#memes-view").empty();

  for (var i = 0; i < memes.length; i++) {

    var newButton = $("<button>").text(memes[i]);

    newButton.addClass("meme-btn");
    newButton.attr("data-name", memes[i]);
    
    $("#memes-view").append(newButton);
    
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

  $("#gifs-appear-here").empty();

  var meme = $(this).attr("data-name");


 var apiKey = "AG4MMBAbDd3PQ7Q6AL5dcYGRmGfCX55Y"


  var queryURL = `https://api.giphy.com/v1/gifs/search?q=${meme}&api_key=${apiKey}&limit=10`;


  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function (response) {
      console.log(response)

      var results = response.data;

      

      for (var i = 0; i < results.length; i++) {

        var memeDiv = $("<div class='meme-div'>");

       


        memeDiv.html(`
        <p>Rating: ${results[i].rating}</p>
        <img src='${results[i].images.fixed_height_still.url}' data-still='${results[i].images.fixed_height_still.url}' data-animate='${results[i].images.fixed_height.url}' data-state='still' class='gif'>
        `);       


          $("#gifs-appear-here").append(memeDiv);
        
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




