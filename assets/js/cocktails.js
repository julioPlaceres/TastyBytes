// triggers the ApiCall function protocols
cockTails();

// var use for alcohol  ingredients
// Aqua velva 
var ingredients1 = "vodka,"
var ingredients2 = "gin,"
var ingredients3 = "blue curacao,"
var ingredients4 = "simple syrup,"
var ingredients5 = "lemon juice,"
var ingredients6 = "soda_water" 
// This executes fetch request and returns cocktail based on user input
function cockTails() {
    var bestCockTailsUrl = "https://the-cocktail-db.p.rapidapi.com/popular.php" //+ ingredients1 //+"%2C"
     //+ ingredients2 + "%2C" + ingredients3 +"%2C" + ingredients4 +"%2C"+ ingredients5 +"%2C"+ ingredients6
 
    

 fetch(bestCockTailsUrl, {
    "method": "GET",
	"headers": {
		"x-rapidapi-key": "e4f90a1b56msh4d99ca7b80ba747p18736ejsn46447159ba5e",
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
	}
  })
   .then(function (res) {
      // checks if res works correctly
      if (res.ok == true) {
        console.log(res);
        return res.json();    
      }
    })

    .then(function (data) {
      // todo mu
      console.log(data);
      console.log(cocktailUrl);
    })
    //Error handler
    .catch((err) => {
      console.error(err);
    });
}


// fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "e4f90a1b56msh4d99ca7b80ba747p18736ejsn46447159ba5e",
// 		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });