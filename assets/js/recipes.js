// Test ingredients for API call -- Change when HTMl is completed
var ingredient1 = "Bread"
var ingredient2 = "basil"
var ingredient3 = "Olive Oil"
var ingredient4 = "garlic"

// Will call API function when page loads (Uncomment Later)
//searchRecipeByIngredients();

// Will search for a max of 5 recipies by ingredients
function searchRecipeByIngredients(){
var apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?" +
"ingredients=" + ingredient1 + 
"%2C" + ingredient2 + 
"%2C" + ingredient3 + 
"%2C" + ingredient4 +  
"&number=5&ignorePantry=true&ranking=1";

fetch(apiUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
})
.then(function (response) {
	// Will return Json object if the request is successful
	if(response.status == 200){
		return response.json();
	}
})
// TODO: Add logic for data manipulation
.then(function (data) {
	console.log(apiUrl);
    console.log(data);
})
// Error handler
.catch(function (err) {
	console.error(err);
});
}