const searchBtn=document.getElementById("search-btn")
const mealList=document.getElementById("meal")
const mealDetailsContent=document.querySelector(".meal-details-content")
const recipeCloseBtn=document.getElementById("recipe-close-btn")

//event listener

searchBtn.addEventListener("click",getMealList);
mealList.addEventListener("click",getMealRecipe);
recipeCloseBtn.addEventListener("click",()=>{
    mealDetailsContent.parentElement.classList.remove("showRecipe")
});
//get meal list that matches with ingredient

function getMealList(){
let searchInputTxt=document.getElementById("search-input").value.trim()

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
.then(response=>response.json())
.then(data=>{
    let html=""
    if(data.meals){
data.meals.forEach(meal => {
    html+=`
    
    <div class="meal-item" data-id="${meal.idMeal}">
    <div class="meal-image">
        <img width="500" src="${meal.strMealThumb}" alt="food img">
    </div>
    <div class="meal-name">
        <h3>${meal.strMeal}</h3>
        <a href="#" class="recipe-btn">get recipe</a>
    </div>
</div>
    
    `;
});
mealList.classList.remove("notFound")
    }else{
        html="sorry we didn't find any meal related to your search 😢😢!"
        mealList.classList.add("notFound")
    }

    mealList.innerHTML=html;
})

}

//get recipe of meal

function getMealRecipe(e){
    e.preventDefault();
    // console.log(e.target);
    if(e.target.classList.contains("recipe-btn")){
        let mealItem=e.target.parentElement.parentElement;
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=>mealRecipeModal(data.meals))
    }
}

//create a model

function mealRecipeModal(meal){
    // console.log(meal);
    meal=meal[0]
    let html=`
    <h2 class=" recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>instruction:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img width="500px" src="${meal.strMealThumb}" alt="food">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">watch video</a>
    </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add("showRecipe")

}