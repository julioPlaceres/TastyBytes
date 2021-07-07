// Test ingredients for API call -- Change when HTMl is completed
var ingredient1 = "Bread"
var ingredient2 = "basil"
var ingredient3 = "Olive Oil"
var ingredient4 = "garlic"
var recipeBtn = document.querySelector(".recipeBtn");
// recipeData1 stores the returned JSON from the API
var recipeData1;
// TODO Remove duplicate
var output = document.querySelector(".output");

// Test Link
console.log(recipeData);

// Will search for a max of 5 recipes by ingredients
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
	// set global var to JSON object
	recipeData1 = data;
})
// Error handler
.catch(function (err) {
	console.error(err);
});
// TODO Uncomment when ready to go live
//fillSuggestedRecipes();
}

function fillSuggestedRecipes (){
	// TODO change to correct var when we finalize project
	for (let i = 0; i < recipeData.length; i++) {
		var title = recipeData[i].title;
		var recipePicUrl = recipeData[i].image;
		var img = document.createElement("img");
		img.setAttribute("src", recipePicUrl);
		console.log(title);
		output.append(title);
		output.append(img);
	}
}



// Will change the fill suggested recipes to searchRecipeByIngredients
recipeBtn.addEventListener("click", fillSuggestedRecipes);