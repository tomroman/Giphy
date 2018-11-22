
var memes = ["salt bae", "dab", "spongebob"];
console.log(memes)

function renderButtons() { 

    $("#memes-view").empty(); 

       for (var i = 0; i < memes.length; i++) {

        var a = $("<button>");

        a.addClass("meme-btn");
        a.attr("data-meme", memes[i]);
        a.text(memes[i]);
        $("#memes-view").append(a);

      }
     }

     $("#add-meme").on("click", function(event) { 
        event.preventDefault();
        var meme = $("#meme-input").val().trim();
        memes.push(meme);
        renderButtons();

     });


      function displayMeme() {
           
            var meme = $(this).attr("data-meme");
            console.log(this);
      
            
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
              meme + "&api_key=dc6zaTOxFJmzC&limit=10";
      
            
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              
              .then(function(response) {
                console.log(queryURL);
      
                console.log(response);
                
                var results = response.data;
      
              
                for (var i = 0; i < results.length; i++) {

                  if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
      
                
                  var memeDiv = $("<div>");
                  var p = $("<p>").text("Rating: " + results[i].rating);
                  var memeImage = $("<img>");                 
                  memeImage.attr("src", results[i].images.fixed_height.url);                     
                  memeDiv.append(p);
                  memeDiv.append(memeImage);   
                  
                  $("#gifs-appear-here").prepend(memeDiv);
                }
              }
            });
          };

          $(document).on("click", ".meme-btn", displayMeme);

          renderButtons();

          $(".gif").on("click", function() {
           
            var state = $(this).attr("data-state");
  
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });





