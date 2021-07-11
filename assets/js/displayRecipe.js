// Global variables
var outputDivEl = document.querySelector(".output");
var recipeListEl = document.querySelector(".recipes-list");
var recipeSelectedEl = document.querySelector(".recipe-selected");
var ingredientsTableEl;
var ingredientsTbodyEl;
var nutritionTableEl;
var nutritionTbodyEl;
var nutritionEl;
var veganEl;
var vegetarianEl;
var glutenFreeEl;
var recipeSelected;
var idSelected;

console.log(recipeInfo);

// Displays information of the selected recipe on the screen
function displayRecipe(event) {
	// if the target clicked is not an image will return
	if (event.target.tagName.toLowerCase() != "img") {
		return;
	}

	createBackBtn();

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
	recipeName.setAttribute("class", "has-text-centered is-size-5 has-text-white has-text-weight-semibold")
	imageHolder.setAttribute("class", "column fitImg box has-background-success roundedCorners");
	recipeImage.setAttribute("src", recipeSelected.image);
	recipeImage.setAttribute("class", "column roundedCorners container");
	recipeSummary.setAttribute("class", "mb-5");
	recipeSummary.innerHTML = recipeInfo[0].summary;

	// Select the div that will hold the recipe selected and append to page
	imageHolder.append(recipeName);
	imageHolder.append(recipeImage);
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

	displayPrepInstructions();
	createNutritionTable();

	// Nutrition info
	displayNutritionInfo("Calories");
	displayNutritionInfo("Sugar");
	displayNutritionInfo("Fat");
	displayNutritionInfo("Protein");
	
	// Additional nutrition
	createNutritionFooter();
	setNutritionFooter();
}

function createIngredientsTable() {
	// Creates Table elements
	ingredientsTableEl = document.createElement("table");
	let ingredientsTrThEl = document.createElement("tr");
	let ingredientsThQtyEl = document.createElement("th");
	let ingredientsThIngEl = document.createElement("th");
	ingredientsTbodyEl = document.createElement("tbody");

	//Asigns values and formatting
	ingredientsTableEl.setAttribute("class", "ingredients table is-bordered is-striped -isnarrow is-hoverable container mb-3");
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

function displayPrepInstructions(){
	//Create elements for the header of Steps section
	let stepsEl = document.createElement("div");
	let stepsHeaderEl = document.createElement("div");
	let stepsBodyEl = document.createElement("div");
	let stepHeader = document.createElement("h3");
	let prepInfo = document.createElement("p");
	let prepMins;
	let readyIn;
	let servins;
	let cookingMins;

	// Give it properties and style
	stepHeader.textContent = "Instruction Steps";
	prepMins = recipeInfo[0].preparationMinutes;
	readyIn = recipeInfo[0].readyInMinutes;
	servins = recipeInfo[0].servings;
	cookingMins = recipeInfo[0].cookingMinutes;
	prepInfo.innerHTML = "Prep Mins: <b>" + prepMins + "</b> " +
	"Ready in Mins: <b>" + readyIn + "</b> " +
	"Servings: <b>" + servins + "</b> " +
	"Cooking Mins: <b>" + cookingMins + "</b>";
	stepsEl.setAttribute("class", "instruction-section");
	stepsHeaderEl.setAttribute("class", "instruction-header has-text-centered mb-3");
	stepsBodyEl.setAttribute("class", "instruction-body has-text-left")
	stepHeader.setAttribute("class", "is-size-5 is-underlined has-text-weight-semibold");
	
	// Append to page
	stepsHeaderEl.append(stepHeader);
	stepsHeaderEl.append(prepInfo);
	stepsEl.append(stepsHeaderEl);
	recipeSelectedEl.append(stepsEl);

	for (let i = 0; i < recipeInfo[0].analyzedInstructions[0].steps.length; i++) {
		// Get instruction, step No and description
		let instructionSteps = recipeInfo[0].analyzedInstructions[0].steps;
		let stepNo = instructionSteps[i].number;
		let description = instructionSteps[i].step;

		// Create the elements for the list
		let instructionsUlEl = document.createElement("ul");
		let instructionsIlEl = document.createElement("il");

		// Assign values to the elements and format them
		instructionsIlEl.textContent = stepNo + " - " + description;

		// Append them to the page
		instructionsUlEl.append(instructionsIlEl);
		stepsBodyEl.append(instructionsUlEl);
		stepsEl.append(stepsBodyEl);
	}
}

function createNutritionTable() {
	// Creates Table elements
	nutritionTableEl = document.createElement("table");
	let nutritionTrThEl = document.createElement("tr");
	let nutritionThNameEl = document.createElement("th");
	let nutritionThAmmountEl = document.createElement("th");
	let nutritionThUnitEl = document.createElement("th");
	nutritionTbodyEl = document.createElement("tbody");

	//Asigns values and formatting
	nutritionTableEl.setAttribute("class", "nutrients table is-bordered is-striped -isnarrow is-hoverable container mt-3");
	nutritionTbodyEl.setAttribute("class", "table-body");
	nutritionThNameEl.textContent = "Name";
	nutritionThAmmountEl.textContent = "ammount";
	nutritionThUnitEl.textContent = "unit";

	// Append to page
	nutritionTrThEl.append(nutritionThNameEl);
	nutritionTrThEl.append(nutritionThAmmountEl);
	nutritionTrThEl.append(nutritionThUnitEl);
	nutritionTableEl.append(nutritionTrThEl);
	nutritionTableEl.append(nutritionTbodyEl);
	recipeSelectedEl.append(nutritionTableEl);
}

// Will create a table row with all needed information and appended on table nutrients
function displayNutritionInfo(nutrientName){
	// Create Row Elements
	let elementRow = document.createElement("tr");
	let elementName = document.createElement("td");
	let elementAmmount = document.createElement("td");
	let elementUnit = document.createElement("td");
	
	// Get nutrients array
	let nutrients = recipeInfo[0].nutrition.nutrients;

	// Loop through and find name index
	let nutrientIndex;
	for(let i = 0; i < nutrients.length; i++){
		if(nutrientName == nutrients[i].name){
			nutrientIndex = i;
		}
	}

	// Create Table Row
	elementName.textContent = nutrients[nutrientIndex].name;
	elementAmmount.textContent = nutrients[nutrientIndex].amount;
	elementUnit.textContent = nutrients[nutrientIndex].unit;

	// Append to table
	elementRow.append(elementName);
	elementRow.append(elementAmmount);
	elementRow.append(elementUnit);
	nutritionTbodyEl.append(elementRow);
}

function createNutritionFooter(){
	// Create nutrition elements
	nutritionEl = document.createElement("div");
	veganEl = document.createElement("div");
	vegetarianEl = document.createElement("div");
	glutenFreeEl = document.createElement("div");

	// Assign Format
	nutritionEl.setAttribute("class", "columns container");
	veganEl.setAttribute("class", "vegan column");
	veganEl.textContent = "Vegan";
	vegetarianEl.setAttribute("class", " vegetarian column");
	vegetarianEl.textContent = "Vegetarian";
	glutenFreeEl.setAttribute("class", "gluttenFree column");
	glutenFreeEl.textContent = "Glutten Free";

	// Append to page
	nutritionEl.append(veganEl);
	nutritionEl.append(vegetarianEl);
	nutritionEl.append(glutenFreeEl);
	recipeSelectedEl.append(nutritionEl);
}

function setNutritionFooter(){
	// Get Wheter recipe is vegan/vegetarian/glutten free
	let veganStatus = recipeInfo[0].vegan;
	let vegetarianStatus = recipeInfo[0].vegetarian;
	let gluttenFreeStatus = recipeInfo[0].glutenFree;

	console.log(veganStatus);
	console.log(vegetarianStatus);
	console.log(gluttenFreeStatus);

	// get yellow icon if it isnt/green if it is/red if no info
	var veganIconStatus = getIcon(veganStatus);
	var vegetarianIconStatus = getIcon(vegetarianStatus);
	var gluttenFreeIconStatus = getIcon(gluttenFreeStatus);

	// append it to page
	document.querySelector(".vegan").append(veganIconStatus);
	document.querySelector(".vegetarian").append(vegetarianIconStatus);
	document.querySelector(".gluttenFree").append(gluttenFreeIconStatus);
}

function getIcon(status){
	let iconSet = document.createElement("div");
	let iconContent;

	switch(status){
		case true:
			iconContent = getIconStatus("has-text-success", "fa-check-square", status);
		break;

		case false:
			iconContent = getIconStatus("has-text-warning", "fa-exclamation-triangle", status);
		break;

		default:
			iconContent = getIconStatus("has-text-warning", "fa-exclamation-triangle", "No information found");
		break;
	}
	iconSet.append(iconContent);
	return iconSet;
}

// Will return the icon appropiate to the parameters passed on
function getIconStatus(textType, iconType, status){
	// Create Elements
	let iconText = document.createElement("span");
	let iconSpan = document.createElement("span");
	let i = document.createElement("i");

	// Give them classes (This will decide which type of icon will return)
	iconText.setAttribute("class", "icon-text " + textType);
	iconText.textContent = status;
	iconSpan.setAttribute("class", "icon");
	i.setAttribute("class", "fas " + iconType)

	// Append and return
	iconSpan.append(i);
	iconText.append(iconSpan);
	return iconText;
}

// Will return a red stop sign to display no info about nutrition status
function createBackBtn() {
	//create btn elements
	let btnSpan = document.createElement("span");
	let innerSpan = document.createElement("span");
	let backBtn = document.createElement("button");
	let icon = document.createElement("i");
	// set class for bulma and font awesome icon
	btnSpan.setAttribute("class", "back icon is-medium");
	backBtn.setAttribute("class", "back button is-success backBtn");
	backBtn.setAttribute("style", "back position: relative; margin-left: -2rem; margin-top: -2rem; max-width: 6rem;");
	icon.setAttribute("class", "back fas fa-chevron-left");
	innerSpan.setAttribute("class", "back");
	innerSpan.textContent = "Back"
	// append back button to the right tile
	backBtn.append(btnSpan);
	backBtn.append(innerSpan);
	btnSpan.append(icon);
	recipeSelectedEl.append(backBtn);
}

// Logic that hides selected recipe and goes back to the list
function goBack(event) {
	let clickTag = event.target;
	// if user clicked the button
	if (clickTag.classList.contains("back")) {
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