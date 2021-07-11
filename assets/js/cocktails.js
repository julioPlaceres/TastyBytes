// var use for alcohol  ingredients
// Aqua velva 
const cocktailBtn = document.querySelector(".cocktailBtn");
var addIngredientBtn = document.querySelector(".add");
var recipeList = document.querySelector(".recipes-list");
var output = document.querySelector(".output");
var searchInputEl = document.querySelector("#search-input");
var ingredientList = document.querySelector("#ingredient-list");
var cocktailIngredients = [];
var ingredientsTable = document.querySelector(".table");
var ingredientsTableBody = document.querySelector(".table-body");
var backBtn = document.querySelector(".backBtn");
var cocktailList, recipeInfo;

// api call to get popular cocktails
function getPopularCocktails() {
    var popularCockTailsUrl = "https://the-cocktail-db.p.rapidapi.com/popular.php" //+ ingredients1 //+"%2C"
     //+ ingredients2 + "%2C" + ingredients3 +"%2C" + ingredients4 +"%2C"+ ingredients5 +"%2C"+ ingredients6
 
    

 fetch(popularCockTailsUrl, {
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
      
    })
    //Error handler
    .catch((err) => {
      console.error(err);
    });
}
// api call to get cocktails from ingredients input
function getCocktailByIngredient (){
  let getCockTailsUrl = "https://the-cocktail-db.p.rapidapi.com/filter.php?i="
	for (let i = 0; i < cocktailIngredients.length; i++) {
		if (cocktailIngredients.length == 1){
			getCockTailsUrl += cocktailIngredients[i];
		}
		else if (cocktailIngredients.length > 1){
			getCockTailsUrl += cocktailIngredients[i] + "%2C";
		}
	}
	if (cocktailIngredients.length < 1) {
		getCockTailsUrl = "https://the-cocktail-db.p.rapidapi.com/popular.php";
	}
	console.log(getCockTailsUrl);
  fetch(getCockTailsUrl, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e4f90a1b56msh4d99ca7b80ba747p18736ejsn46447159ba5e",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com"
    }
    })
     .then(function (res) {
        // checks if res works correctly
        if (res.ok == true) {
          return res.json();    
        }
				else {
					alert("404 error")
				}
      })
  
      .then(function (data) {
        
        console.log(data);
        cocktailList = data.drinks;
				fillSuggestedRecipes(cocktailList);
        
      })
      //Error handler
      .catch((err) => {
        console.error(err);
      });
}

function handleSearchInput() {
	// get ingredient input value
	let searchInputVal = searchInputEl.value.trim();
	if (searchInputVal != "") {
		// push ingredient to array
		cocktailIngredients.push(searchInputVal);
		// clear input box
		searchInputEl.value = "";
		// save ingredient to the array in local storage
		// show the ingredient on the page
		if (cocktailIngredients.length <= 5){
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
	for (let i = 0; i < cocktailIngredients.length; i++) {
		let ingredient = cocktailIngredients[i];
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
		cocktailIngredients.splice(index, 1);
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
//save array of ingredients to local storage
function storeIngredients() {
	// save ingredients array to local storage
	localStorage.setItem("cocktailIngredients", JSON.stringify(cocktailIngredients));
}


function fillSuggestedRecipes() {
	unhideRecipeList();
	// clear list
	recipeList.innerHTML = "";
	createBackBtnSuggested();
	// create title
	let div1 = document.createElement("div");
	div1.textContent = "Suggested Cocktails";
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	recipeList.append(div1);
	// TODO change to correct var when we finalize project
	for (let i = 0; i < cocktailList.length && i < 5; i++) {
		var title = cocktailList[i].strDrink;
		var recipePicUrl = cocktailList[i].strDrinkThumb;

		columnLayout(title, recipePicUrl, i);
	}
	hideTile1();
}


function columnLayout(title, recipePicUrl, i) {
	// create the div and img elements
	var img = document.createElement("img");
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var div3 = document.createElement("div");
	// Set Id attribute in order to be easier to determine which image the user clicked on
	img.setAttribute("src", recipePicUrl);
	img.setAttribute("data-id", cocktailList[i].idDrink);
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
cocktailBtn.addEventListener("click", getCocktailByIngredient);
addIngredientBtn.addEventListener("click", handleSearchInput);
ingredientList.addEventListener("click", removeIngredient);
recipeList.addEventListener("click", goBackIng)
