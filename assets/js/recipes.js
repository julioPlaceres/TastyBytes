// Test ingredients for API call -- Change when HTMl is completed
var ingredient1 = "Bread";
var ingredient2 = "basil";
var ingredient3 = "Olive Oil";
var ingredient4 = "garlic";
var recipeName = document.querySelector ("#recipe-name")
var description = document.querySelector("#description")
var recipeImage = document.querySelector("#recipe-picture")
var recipeBtn = document.querySelector(".recipeBtn");
var addIngredientBtn = document.querySelector(".add");
var recipeList = document.querySelector(".recipes-list");
var output = document.querySelector(".output");
var searchInputEl = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredient-list");
var ingredients = [];
// recipeData1 stores the returned JSON from the API
//TODO rename these
var recipeData1, nutritionData1;

// Test Link
console.log("Initial API call");
console.log(recipeData);
console.log("Detailed recipe info");
console.log(recipeInfo);
function handleSearchInput (){
	// get ingredient input value
	let searchInputVal = searchInputEl.value.trim();
	if (searchInputVal != ""){
		// push ingredient to array
		ingredients.push(searchInputVal);
		// clear input box
		searchInputEl.value = "";
		// save ingredient to the array in local storage
		storeIngredients();
		// show the ingredient on the page
		appendIngredients();
	}
}

function appendIngredients(){
	// clear list
	ingredientList.innerHTML = "";
	// loop through the array and put everything on the page
	for (let i = 0; i < ingredients.length; i++) {
		let ingredient = ingredients[i];
		let div = document.createElement("div");
		let header = document.createElement("div");
		header.textContent = capitalFormat(ingredient);
		div.setAttribute("class", "message is-success");
		// data index so we know which one we are deleting later
		div.setAttribute("data-index", i);
		header.setAttribute("class", "message-header");
		// delete button
		let button = document.createElement("button");
		button.setAttribute("class", "delete");
		// append in this way makes bulma format it nicely
		header.append(button);
		div.append(header);
		ingredientList.append(div);
	}


}

function removeIngredient(event){
	let element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the ingredient from the list
    let index = element.parentElement.parentElement.getAttribute("data-index");
		// delete this one ingredient that we clicked
    ingredients.splice(index, 1);
    // store ingredients in local storage and write to page
    storeIngredients();
    appendIngredients();

	}
};

function onEnterKey (event){
		if (event.key === 'Enter') {
			// Cancel the default action, if needed
			event.preventDefault();
			// Trigger the button element with a click
			addIngredientBtn.click();
			// reset input text on search
			searchInputEl.value = "";
		}
		
	};

function storeIngredients() {
  // save ingredients array to local storage
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
}
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
	// set global var to JSON object TODO rename
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
	//clear list
	recipeList.innerHTML = "";
	// TODO change to correct var when we finalize project
	for (let i = 0; i < recipeData.length; i++) {
		var title = recipeData[i].title;
		var recipePicUrl = recipeData[i].image;
		
		columnLayout(title, recipePicUrl, i);
	}
}


function columnLayout (title, recipePicUrl, i){
	// create the div and img elements
	var img = document.createElement("img");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	// Set Id attribute in order to be easier to determine which image the user clicked on
	img.setAttribute("src", recipePicUrl);
	img.setAttribute("data-id", recipeData[i].id);
	img.setAttribute("class", "roundedCorners mt-5");
	// seat attribute on divs in this order for bulma css columns layout
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold");
	div2.setAttribute("class","columns");
	div3.setAttribute("class","column");
	// append divs to page in the correct order
	recipeList.append(div1);
	div1.append(title);
	div1.append(div2);
	div2.append(div3);
	div3.append(img);
}

function getRecipeInfo (){
	//TODO refactor for loop through JSON array and set ID = to recipe1, recipe 2 etc.
	let recipe1 = 560113;
	let apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipe1 + "&includeNutrition=true";
//	+ "%2C" + recipe2 + 
// "%2C" + recipe3 + 
// "%2C" + recipe4 +  

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
		console.log(response);
		return response.json();
	}
})
// TODO: Add logic for data manipulation
.then(function (data) {
	console.log(apiUrl);
  console.log(data);
	// set global var to JSON object rename later
	nutritionData1 = data;
	console.log(nutritionData1);
})
// Error handler
.catch(function (err) {
	console.error(err);
});
}

//Display recipe
function displayRecipe(event){
	//Check if the object clicked is an image (Work in Progress)
	// if(event.target.tagName != "img"){
	// 	return;
	// }

	// Get the image that got cliked
	let imageSelected = event.target;
	// Retrieve Data Attribute assign to image
	let id = imageSelected.dataset.id;
	console.log(id);

	// Hide current List of recipes
	recipeList.setAttribute("class", "is-hidden");

	var recipeSelected; // Use to pass value from for loop

	// Loops through the recipe object array in order to get the ID and
	// retrive the object for the main recipe
	for(let i = 0; i < recipeData.length; i++){
		if(id == recipeData[i].id){
			recipeSelected = recipeData[i];
		}
	}
	// Display the title property
	recipeName.textContent = recipeSelected.title;
}
//capitalize every word
function capitalFormat (searchInput){
	var cap = searchInput.split(" ");
	for (let i = 0; i < cap.length; i++) {
	 cap[i] = cap[i][0].toUpperCase() + cap[i].substr(1);
	}
	return(cap.join(' '));
}

// Execute a function when the user presses a key on the keyboard while typing in the searchbox
searchInputEl.addEventListener("keyup", onEnterKey);

// Get target for photo selected
recipeList.addEventListener("click", displayRecipe);

//TODO Will change the fill suggested recipes to searchRecipeByIngredients
recipeBtn.addEventListener("click", fillSuggestedRecipes);
addIngredientBtn.addEventListener("click", handleSearchInput);
ingredientList.addEventListener("click", removeIngredient);