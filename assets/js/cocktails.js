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
var popularCocktails = popularCocktailsObj.drinks;
var byIngCocktails = byIngCocktailsObj.drinks;
var cocktailList;
console.log("Popular Cocktails");
console.log(popularCocktails);
console.log("By ingredient");
console.log(byIngCocktails);
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
  let getCockTailsUrl = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin"
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
      })
  
      .then(function (data) {
        
        console.log(data);
        cocktailList = data;
        
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
	// clear list
	recipeList.innerHTML = "";
	// create title
	let div1 = document.createElement("div");
	div1.textContent = "Suggested Cocktails";
	div1.setAttribute("class","column has-text-centered is-size-5 has-text-weight-semibold box has-background-success has-text-white");
	recipeList.append(div1);
	// TODO change to correct var when we finalize project
	for (let i = 0; i < 5; i++) {
		var title = popularCocktails[i].strDrink;
		var recipePicUrl = popularCocktails[i].strDrinkThumb;

		columnLayout(title, recipePicUrl, i);
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
	img.setAttribute("data-id", popularCocktails[i].idDrink);
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

function createBackBtn (){
  //create btn elements
  let btnSpan = document.createElement("span");
  let innerSpan = document.createElement("span");
  let backBtn = document.createElement("button");
  let icon = document.createElement("i");
  // set class for bulma and font awesome icon
  btnSpan.setAttribute("class", "icon is-medium");
  backBtn.setAttribute("class", "button is-success backBtn");
  backBtn.setAttribute("style", "position: relative; margin-left: -2rem; margin-top: -3rem;");
  icon.setAttribute("class", "fas fa-chevron-left");
  innerSpan.textContent = "Back"
  // append back button to the right tile
  backBtn.append(btnSpan);
  backBtn.append(innerSpan);
  btnSpan.append(icon);
  output.append(backBtn);
}

function goBack (event){
  let recipeSelectedDiv = document.querySelector(".recipe-selected");
  let clickTag = event.target.tagName.toLowerCase();
  // if user clicked the button
  if (clickTag == "button" || clickTag == "span" || clickTag =="i"){
    //hide the single recipe
    recipeSelectedDiv.classList.add("is-hidden");
    //unhide the previous list
    recipeList.classList.remove("is-hidden");
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
cocktailBtn.addEventListener("click", fillSuggestedRecipes);
addIngredientBtn.addEventListener("click", handleSearchInput);
ingredientList.addEventListener("click", removeIngredient);
// Event listener for back button
output.addEventListener("click", goBack)