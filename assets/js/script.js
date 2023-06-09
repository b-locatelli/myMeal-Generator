//mobile menu
var welcomePage = document.querySelector("#welcome-page");
var mealPage = document.querySelector("#meal-page");
var favoritesPage = document.getElementById("favorites-page");
var generateDrinkBtn = document.querySelector("#drink-generate");
var generateFoodBtn = document.querySelector("#food-generate");
var generateMealBtn = document.querySelector("#meal-generate");
var backToWelc = document.querySelector("#back-to-welcome");
var saveFoodBtn = document.getElementById("save-food");
var saveDrinkBtn = document.getElementById("save-drink");
var favorites = document.getElementById("my-favorites");
var drinkList = document.getElementById("fav-drink")
var foodList = document.getElementById("fav-food")
var keepFood = JSON.parse(window.localStorage.getItem("foodEntries")) || []
var keepDrink = JSON.parse(window.localStorage.getItem("drinkEntries")) || []


// DRINK API
function getApiDrink() {
  var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(drinkUrl)
    .then(async function (response) {
      return response.json();
    })
    .then(function (data) {
      generateRandomDrink(data); //1 made function to display data
      saveDrinkBtn.setAttribute("data", JSON.stringify(data));
      console.log(data);
    });
}

function generateRandomDrink(cocktail) {
  // 2 start making function trf data in cocktail arg
  let drink = document.querySelector("#drink"); // 3 grab the element to display in
  drink.appendChild(generateDrinkBtn);
  drink.appendChild(saveDrinkBtn);
  

  let drinkName = document.createElement("h2"); // 4 to display name
  drinkName.innerHTML = cocktail.drinks[0].strDrink; // 5 grab the name from response array
  drink.appendChild(drinkName); // 6 append to the display element/area

  let img = document.createElement("img"); // 7 to display image
  img.src = cocktail.drinks[0].strDrinkThumb; // 8 grab image from array
  drink.appendChild(img); // 9 append to display area

  for (let i = 1; i < 16; i++) {
    // 10 multiple ingredients therefore need loop to go thru them they start from 1 to 15
    // 14 since there were null entries and empty strings therefore to exclude them used IF
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    } else if (cocktail.drinks[0][`strIngredient${i}`] == "") {
      break;
    } else if (cocktail.drinks[0][`strIngredient${i}`] == " ") {
      break;
    }
    let ingredients = document.createElement("li"); // 11 to put ingredients in a list
    ingredients.innerHTML =
      cocktail.drinks[0][`strIngredient${i}`] +
      " -> " +
      cocktail.drinks[0][`strMeasure${i}`]; // 12 to put ingredients and measures together directly from JSON array
    drink.appendChild(ingredients); // 13 append to display area
  }

  let inst = document.createElement("p"); // 15 to have a placeholder for instruction
  inst.innerHTML = cocktail.drinks[0].strInstructions; // 16 get instructions from data
  drink.appendChild(inst); //17 append to display area
}


// FOOD API
function getApiFood() {
  var foodUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
  fetch(foodUrl)
    .then(async function (response) {
      return response.json();
    })
    .then(function (data) {
      saveFoodBtn.setAttribute("data", JSON.stringify(data))
      generateRandomFood(data); //1 made function to display data
      console.log(data);
    });
}

function generateRandomFood(meal) {
  // 2 start making function trnf data in cocktail arg
  let food = document.querySelector("#food"); // 3 grab the element to display in
  food.appendChild(generateFoodBtn);
  food.appendChild(saveFoodBtn);

  let foodName = document.createElement("h2"); // 4 to display name
  foodName.innerHTML = meal.meals[0].strMeal; // 5 grab the name from response array
  food.appendChild(foodName); // 6 append to the display element/area

  let imgs = document.createElement("img"); // 7 to display image
  imgs.src = meal.meals[0].strMealThumb; // 8 grab image from array
  food.appendChild(imgs); // 9 append to display area

  for (let i = 1; i < 16; i++) {
    // 10 multiple ingredients therefore need loop to go thru them they start from 1 to 15
    // 14 since there were null entries and empty strings therefore to exclude them used IF
    if (meal.meals[0][`strIngredient${i}`] == null) {
      break;
    } else if (meal.meals[0][`strIngredient${i}`] == "") {
      break;
    } else if (meal.meals[0][`strIngredient${i}`] == " ") {
      break;
    }
    let ingredient = document.createElement("li"); // 11 to put ingredients in a list
    ingredient.innerHTML =
      meal.meals[0][`strIngredient${i}`] +
      " -> " +
      meal.meals[0][`strMeasure${i}`]; // 12 to put ingredients and measures together directly from JSON array
    food.appendChild(ingredient); // 13 append to display area
  }

  let instruction = document.createElement("p"); // 15 to have a placeholder for instruction
  instruction.innerHTML = meal.meals[0].strInstructions; // 16 get instructions from data
  food.appendChild(instruction); //17 append to display area
}


// shows meal page and hides welcome page
generateMealBtn.addEventListener("click", function () {
  welcomePage.style.display = "none";
  mealPage.setAttribute("style", "display: flex;");
});

favorites.addEventListener("click", function () {
  welcomePage.style.display = "none";
  mealPage.style.display = "none";
  showDrinks();
  showFoods();
  favoritesPage.style.display = "block";
});

// when myMeal logo is clicked, it takes you back to the welcome page
backToWelc.addEventListener("click", function () {
  welcomePage.style.display = "block";
  window.location.reload();
  mealPage.style.display = "none";
  favoritesPage.style.display = "none";
});

// these load a new drink or food individually when each button is clicked
generateMealBtn.addEventListener("click", function () {
  getApiDrink();
  getApiFood();
});

generateDrinkBtn.addEventListener("click", function () {
  drink.innerHTML = "";
  getApiDrink();
});
generateFoodBtn.addEventListener("click", function () {
  food.innerHTML = "";
  getApiFood();
});

// favorite drink and food
function saveItemFood() {
  var savedFood = saveFoodBtn.getAttribute("data");
  localStorage.setItem("savedFood", savedFood);
  var foodItem = localStorage.getItem("savedFood");
  var parseFood = JSON.parse(foodItem);
  keepFood.push(parseFood);
  localStorage.setItem("foodEntries", JSON.stringify(keepFood));
}

function saveItemDrink(event) {
  event.preventDefault();
  var savedDrink = saveDrinkBtn.getAttribute("data");
  localStorage.setItem("savedDrink", savedDrink);
  var drinkItem = localStorage.getItem("savedDrink");
  var parseDrink = JSON.parse(drinkItem);
  keepDrink.push(parseDrink);
  localStorage.setItem("drinkEntries", JSON.stringify(keepDrink));
}



function showDrinks() {
  var storedDrinks = JSON.parse(localStorage.getItem("drinkEntries"));
  var listedDrink;
  for (var index = 0; index < storedDrinks.length; index++) {
    listedDrink = document.createElement("li");
    console.log(storedDrinks[index].drinks[0].strDrink);
    listedDrink.textContent = storedDrinks[index].drinks[0].strDrink;
    drinkList.appendChild(listedDrink);
  }
}

function showFoods() {
  var storedFood = JSON.parse(localStorage.getItem("foodEntries"));
  var listedFood;
  for (var index = 0; index < storedFood.length; index++) {
    listedFood = document.createElement("li");
    listedFood.innerHTML = storedFood[index].meals[0].strMeal;
    foodList.appendChild(listedFood);
  }
}

saveFoodBtn.addEventListener("click", saveItemFood);
saveDrinkBtn.addEventListener("click", saveItemDrink);




