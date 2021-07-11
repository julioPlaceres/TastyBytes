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
  recipeList.append(backBtn);
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

