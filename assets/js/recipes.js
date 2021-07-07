ApiCall();

function ApiCall(){

fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9aa92d7aa7msh77d7072478c9634p1b415cjsn6487488da0d0",
		"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
    console.log(response.body);    
})
.then(data =>{
    console.log(data);
})
.catch(err => {
	console.error(err);
});
}