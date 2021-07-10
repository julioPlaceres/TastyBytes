// Global variables
var outputDivEl = document.querySelector(".output");
var recipeListEl = document.querySelector(".recipes-list");
var recipeSelectedEl = document.querySelector(".recipe-selected");
var ingredientsTableEl;
var ingredientsTrThEl;
var ingredientsThQtyEl;
var ingredientsThIngEl;
var ingredientsTbodyEl;
var recipeSelected;
var idSelected;

// Displays information of the selected recipe on the screen
function displayRecipe(event) {
	// if the target clicked is not an image will return
	if (event.target.tagName.toLowerCase() != "img") {
		return;
	}

	// Removes the current List of recipes and shows the recipe Selected
	recipeListEl.classList.add("is-hidden");
	recipeSelectedEl.classList.remove("is-hidden");

	// Get the image that got cliked
	let imageSelected = event.target;
	// Retrieve Data Attribute assign to image
	idSelected = imageSelected.dataset.id;

	// Loops through the recipe object array in order to get the ID and
	// retrive the object for the main recipe
	for (let i = 0; i < recipeData.length; i++) {
		if (idSelected == recipeData[i].id) {
			recipeSelected = recipeData[i];
		}
	}

	// Create the elements needed for the display of the recipe
	let recipeName = document.createElement("h2");
	let imageHolder = document.createElement("div");
	let recipeImage = document.createElement("img");
	let recipeSummary = document.createElement("p");

	// Assign values to the elements and format them
	recipeName.textContent = recipeSelected.title;
	recipeName.setAttribute("class", "has-text-centered")
	imageHolder.setAttribute("class", "column");
	recipeImage.setAttribute("src", recipeSelected.image);
	recipeImage.setAttribute("class", "column");
	recipeSummary.innerHTML = recipeInfo[0].summary;

	// Select the div that will hold the recipe selected and append to page
	imageHolder.append(recipeImage);
	recipeSelectedEl.append(recipeName);
	recipeSelectedEl.append(imageHolder);
	recipeSelectedEl.append(recipeSummary);

	// Will display missed ingredients to the page (needs to be bold)
	for (let i = 0; i < recipeSelected.missedIngredients.length; i++) {
		// 	Creates a table
		let trEl = document.createElement("tr");
		let tdQty = document.createElement("td");
		let tdName = document.createElement("td");

		// Get values from array
		let amount = recipeSelected.missedIngredients[i].amount;
		let productName = recipeSelected.missedIngredients[i].name;

		// Will be use to loop through the ingredients of the second API call
		// to get the missing ingredient index
		let ingredientIndex;
		//Find the index of the ingredient missing
		for (let a = 0; a < recipeInfo[0].nutrition.ingredients.length; a++) {
			searchIndex = recipeInfo[0].nutrition.ingredients[a].name.indexOf(productName);
			if (searchIndex != -1) {
				ingredientIndex = a;
				break;
			}
		}

		// Get values from array
		let units = recipeInfo[0].nutrition.ingredients[ingredientIndex].unit;

		// 	Give it context and Style
		tdQty.innerHTML = "<b>" + amount + " " + units + "</b>";
		tdName.innerHTML = "<b>" + productName + "</b>";

		// creates table and back button
		createIngredientsTable();
		createBackBtn();

		// Appends to Page
		trEl.appendChild(tdQty);
		trEl.appendChild(tdName);
		ingredientsTbodyEl.appendChild(trEl);
	}

	// Will display the current used ingredients
	for (let i = 0; i < recipeSelected.usedIngredients.length; i++) {
		// Creates a row
		let trEl = document.createElement("tr");
		let tdQty = document.createElement("td");
		let tdName = document.createElement("td");

		// Get values and format it
		let amount = recipeSelected.usedIngredients[i].amount;
		let productName = recipeSelected.usedIngredients[i].name;

		// Will be use to loop through the ingredients of the second API call
		// to get the rest of the ingredients index
		for (let a = 0; a < recipeInfo[0].nutrition.ingredients.length; a++) {
			searchIndex = recipeInfo[0].nutrition.ingredients[a].name.indexOf(productName);
			if (searchIndex != -1) {
				ingredientIndex = a
				break;
			}
		}

		// Get values from array
		let units = recipeInfo[0].nutrition.ingredients[ingredientIndex].unit;

		// Give it context
		tdQty.textContent = amount + " " + units;
		tdName.textContent = productName;

		// Appends to Page
		trEl.appendChild(tdQty);
		trEl.appendChild(tdName);
		ingredientsTbodyEl.appendChild(trEl);
	}

	// Add for loop
	for (let i = 0; i < recipeSelected.usedIngredients.length; i++) {
		// TODO : instructions (work in progress)
	}
}

function createIngredientsTable() {
	// Creates Table elements
	ingredientsTableEl = document.createElement("table");
	ingredientsTrThEl = document.createElement("tr");
	ingredientsThQtyEl = document.createElement("th");
	ingredientsThIngEl = document.createElement("th");
	ingredientsTbodyEl = document.createElement("tbody");

	//Asigns values and formatting
	ingredientsTableEl.setAttribute("class", "table is-bordered is-striped -isnarrow is-hoverable container");
	ingredientsTbodyEl.setAttribute("class", "table-body");
	ingredientsThQtyEl.textContent = "Quantity";
	ingredientsThIngEl.textContent = "Ingredients";

	// Append to page
	ingredientsTrThEl.append(ingredientsThQtyEl);
	ingredientsTrThEl.append(ingredientsThIngEl);
	ingredientsTableEl.append(ingredientsTrThEl);
	ingredientsTableEl.append(ingredientsTbodyEl);
	recipeSelectedEl.append(ingredientsTableEl);
}

function createBackBtn() {
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
	recipeSelectedEl.append(backBtn);
}

// Logic that hides selected recipe and goes back to the list
function goBack(event) {
	// let recipeSelectedDiv = document.querySelector(".recipe-selected");
	// let recipeList = document.querySelector(".recipes-list");
	// let recipeSelectedOutput = document.querySelector(".table")
	let clickTag = event.target.tagName.toLowerCase();
	// if user clicked the button
	if (clickTag == "button" || clickTag == "span" || clickTag == "i") {
		//hide the single recipe
		recipeSelectedEl.classList.add("is-hidden");
		//unhide the previous list
		recipeListEl.classList.remove("is-hidden");
		// Will clear the current recipe and delete the back button
		recipeSelectedEl.innerHTML = "";
	}
}

// Event listener for back button
recipeSelectedEl.addEventListener("click", goBack)
recipeListEl.addEventListener("click", displayRecipe);