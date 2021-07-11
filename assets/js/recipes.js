// Test ingredients for API call -- Change when HTMl is completed
var ingredient1 = "Bread";
var ingredient2 = "basil";
var ingredient3 = "Olive Oil";
var ingredient4 = "garlic";
var recipeBtn = document.querySelector(".recipeBtn");
var addIngredientBtn = document.querySelector(".add");
var recipeList = document.querySelector(".recipes-list");
var output = document.querySelector(".output");
var searchInputEl = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredient-list");
var ingredients = [];
var ingredientsTable = document.querySelector(".table");
var ingredientsTableBody = document.querySelector(".table-body");
// recipeData1 stores the returned JSON from the API
//TODO change to real variables when going live
var recipeData, apiData;
//getRecipeInfo(560113);

// Test Link
console.log("Initial API call");
console.log(recipeData);
console.log("Detailed recipe info");
// console.log(recipeInfo);
function handleSearchInput() {
	// get ingredient input value
	let searchInputVal = searchInputEl.value.trim();
	if (searchInputVal != "") {
		// push ingredient to array
		ingredients.push(searchInputVal);
		// clear input box
		searchInputEl.value = "";
		// save ingredient to the array in local storage
		// show the ingredient on the page
		if (ingredients.length <= 5){
			storeIngredients();
			appendIngredients();
		}
		else {
			alert("Maximum of 5 Ingredients")
		}
	}
}
// adds ingredients to page
function appendIngredients() {
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
// removes the ingredient that the user clicked on
function removeIngredient(event) {
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
// makes it so the enter key adds the ingredient to the list
function onEnterKey(event) {
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
function searchRecipeByIngredients() {
	if (ingredients == ""){
		alert("Add ingredients and then search for recipes")
		return;
	}
	//function to create the url based on what is in the ingredients array
		let apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=";
		// loop through array of ingredients, add them to the url in the proper way
		for (let i = 0; i < ingredients.length; i++) {
			apiUrl += "%2C" + ingredients[i];
		}
		// add the tail of the url after ingredients
		apiUrl += "&number=5&ignorePantry=true&ranking=1";
		// output the url for fetch request
	fetch(apiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	})
		.then(function (response) {
			// Will return Json object if the request is successful
			if (response.status == 200) {
				return response.json();
			}
		})
		// TODO: Add logic for data manipulation
		.then(function (data) {
			// set global var to JSON object TODO rename
					recipeData = data;
			console.log(recipeData);
			if (recipeData != ""){
				fillSuggestedRecipes(recipeData);
			}
			else{
				alert("No recipes found")
				return;
			}
		})
		// Error handler
		.catch(function (err) {
			console.error(err);
		});
}
//TODO when going live, pass in recipeData
function fillSuggestedRecipes() {
	unhideRecipeList();
	// clear list
	recipeList.innerHTML = "";
	createBackBtnSuggested();
	// create title
	let div1 = document.createElement("div");
	div1.textContent = "Suggested Recipes";
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	recipeList.append(div1);
	// TODO change to correct var when we finalize project
	for (let i = 0; i < recipeData.length; i++) {
		var title = recipeData[i].title;
		var recipePicUrl = recipeData[i].image;

		columnLayout(title, recipePicUrl, i);
	}
	hideTile1();
}

function unhideRecipeList (){
	let tile2 = document.querySelector(".right-tile");
	// if tile 2 is hidden, unhide it
	if (tile2.classList.contains("is-hidden")){
		tile2.classList.remove("is-hidden")
	}
}

function hideTile1 (){
	let tile1 = document.querySelector(".left-tile");
	if (tile1.classList.contains("is-hidden") == false){
		tile1.classList.add("is-hidden");
	}

}

function createBackBtnSuggested (){
  //create btn elements
  let btnSpan = document.createElement("span");
  let innerSpan = document.createElement("span");
  let backBtn = document.createElement("button");
  let icon = document.createElement("i");
  // set class for bulma and font awesome icon
  btnSpan.setAttribute("class", "icon is-medium back");
  backBtn.setAttribute("class", "button is-success backBtn back");
  backBtn.setAttribute("style", "position: relative; margin-left: -.1rem; margin-top: -2rem; margin-bottom: 1rem; max-width: 6rem;");
  icon.setAttribute("class", "fas fa-chevron-left back");
  innerSpan.setAttribute("class", "back");
  innerSpan.textContent = "Back"
  // append back button to the right tile
  backBtn.append(btnSpan);
  backBtn.append(innerSpan);
  btnSpan.append(icon);
  recipeList.append(backBtn);
}

function goBackIng (event){
	let tile1 = document.querySelector(".left-tile");
	let tile2 = document.querySelector(".right-tile");
	let clickTag = event.target;
  // if user clicked the back button
  if (clickTag.classList.contains("back")){
		if (tile1.classList.contains("is-hidden")){
			// hide tile 2 and show tile 1
			tile1.classList.remove("is-hidden");
			tile2.classList.add("is-hidden");
		}
  }
}


function columnLayout(title, recipePicUrl, i) {
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
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	div2.setAttribute("class","columns");
	div3.setAttribute("class","column");
	// append divs to page in the correct order
	recipeList.append(div1);
	div1.append(title);
	div1.append(div2);
	div2.append(div3);
	div3.append(img);
}

// pass in ID of clicked recipe
function getRecipeInfo(recipeId) {

	//TODO pass in recipe ID
	let apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipeId;
	console.log(apiUrl);
	
	fetch(apiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
			"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
		}
	})
		.then(function (response) {
			// Will return Json object if the request is successful
			if (response.status == 200) {
				console.log(response);
				return response.json();
			}
		})
		.then(function (data) {
			console.log(data);
			// set global var to store detailed data
			//TODO have selected recipe call the api response only
			//then, here in the .then, call the rest of the function passing in the data from the API
			apiData = data;
			console.log(apiData);
			return(apiData);
		})
		// Error handler
		.catch(function (err) {
			console.error(err);
		});
	}

//capitalize every word
function capitalFormat(searchInput) {
	var cap = searchInput.split(" ");
	for (let i = 0; i < cap.length; i++) {
		cap[i] = cap[i][0].toUpperCase() + cap[i].substr(1);
	}
	return (cap.join(' '));
}

// Execute a function when the user presses a key on the keyboard while typing in the searchbox
searchInputEl.addEventListener("keyup", onEnterKey);

//TODO Will change the fill suggested recipes to searchRecipeByIngredients
recipeBtn.addEventListener("click", searchRecipeByIngredients);
addIngredientBtn.addEventListener("click", handleSearchInput);
ingredientList.addEventListener("click", removeIngredient);
// Event listener for back button
recipeList.addEventListener("click", goBackIng)
//output.addEventListener("click", goBack)
