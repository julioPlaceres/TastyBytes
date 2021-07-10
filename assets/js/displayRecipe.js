function displayRecipe(event) {
	// if the target clicked is not an image will return
	if (event.target.tagName.toLowerCase() != "img") {
		return;
	}

	// Removes the current List of recipes
	document.querySelector(".recipes-list").remove();

	// Get the image that got cliked
	let imageSelected = event.target;
	// Retrieve Data Attribute assign to image
	let id = imageSelected.dataset.id;

	// Use to pass value from for loop and will
	// contain the recipe selected
	let recipeSelected;

	// Loops through the recipe object array in order to get the ID and
	// retrive the object for the main recipe
	for (let i = 0; i < recipeData.length; i++) {
		if (id == recipeData[i].id) {
			recipeSelected = recipeData[i];
		}
	}

	// Create the elements needed for the display of the recipe
	let recipeName = document.createElement("h2");
	let divImg1 = document.createElement("div");
	let recipeImage = document.createElement("img");
	let recipeSummary = document.createElement("p");

	// Assign values to the elements and format them
    recipeName.textContent = recipeSelected.title;
    recipeName.setAttribute("class", "has-text-centered")
    divImg1.setAttribute("class", "columns has-text-centred fitImg");
    recipeImage.setAttribute("src", recipeSelected.image);
    recipeImage.setAttribute("class", "columns has-text-centred fitImg");
    recipeSummary.innerHTML = recipeInfo[0].summary;
    // Select the div that will hold the recipe selected and append to page
    let recipeSelectedDiv = document.querySelector(".recipe-selected");
    divImg1.append(recipeImage);
    recipeSelectedDiv.append(recipeName);
    recipeSelectedDiv.append(divImg1);
    recipeSelectedDiv.append(recipeSummary);

	// Removes the is-hidden class only from the selected recipe div
	// and the ingredients list
	recipeSelectedDiv.classList.remove("is-hidden");
	ingredientsTable.classList.remove("is-hidden");

	// Will display missed ingredients to the page (needs to be bold)
	for (let i = 0; i < recipeSelected.missedIngredients.length; i++) {
		// Creates a row
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

		// Give it context and Style
		tdQty.innerHTML = "<b>" + amount + " " + units + "</b>";
		tdName.innerHTML = "<b>" + productName + "</b>";

		// Appends to Page
		trEl.appendChild(tdQty);
		trEl.appendChild(tdName);
		ingredientsTableBody.appendChild(trEl);
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
		ingredientsTableBody.appendChild(trEl);
	}

	// Add for loop
	for (let i = 0; i < recipeSelected.usedIngredients.length; i++) {
		// TODO : instructions (work in progress)
	}
}

recipeList.addEventListener("click", displayRecipe);