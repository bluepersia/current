import { API_URL } from '../utility.js';

export default class Recipe 
{
    constructor (results, bookmarks)
    {
        this.results = results;
        
        const recipeEl = document.querySelector ('.recipe');

        recipeEl.addEventListener ('click',  ({target}) =>
        {

            if (target.closest ('.bookmark-btn'))
            {
                bookmarks.bookmark (this.recipe);
            }
            else if (target.closest ('.btn-serving'))
            {
                let newServings = this.recipe.servings;

                if (target.closest ('.btn--decrease-servings'))
                    newServings = newServings - 1;
                else if (target.closest ('.btn--increase-servings'))
                    newServings = newServings + 1;

                if (newServings > 8 || newServings < 1)
                    return;

                if (newServings == this.recipe.servings)
                return;

                const change = newServings / this.recipe.servings;

                for(const ingredient of this.recipe.ingredients)
                    ingredient.quantity *= change;

                this.recipe.cooking_time *= change;

                this.recipe.servings = newServings;

                renderRecipe ();
            }
        });

        const renderRecipe = () => {

            console.log (this.recipe);

            const {title, image_url, cooking_time, servings} = this.recipe;

            recipeEl.innerHTML = `
            <figure class="recipe__fig">
                <img src="${image_url}" alt="Tomato" class="recipe__img" />
                <h1 class="recipe__title">
                <span>${title}</span>
                </h1>
             </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${cooking_time.toFixed (0)}</span>
                <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn--tiny btn--decrease-servings btn-serving">
                    <svg>
                        <use href="src/img/icons.svg#icon-minus-circle"></use>
                    </svg>
                    </button>
                    <button class="btn--tiny btn--increase-servings btn-serving">
                    <svg>
                        <use href="src/img/icons.svg#icon-plus-circle"></use>
                    </svg>
                    </button>
                </div>
                </div>

                <div class="recipe__user-generated">
                <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                </svg>
                </div>
                <button class="btn--round bookmark-btn">
                <svg class="">
                    <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this.recipe.ingredients.map (ingredient => `
                    <li class="recipe__ingredient">
                        <svg class="recipe__icon">
                        <use href="src/img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__quantity">${ingredient.quantity}</div>
                        <div class="recipe__description">
                        <span class="recipe__unit">${ingredient.unit}</span>
                        ${ingredient.description}
                        </div>
                    </li>`).join('')}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
                directions at their website.
                </p>
                <a
                class="btn--small recipe__btn"
                href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
                target="_blank"
                >
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
                </a>
            </div>`;
        }

        const fetchAndRenderRecipe = async () => {

        
        
        recipeEl.innerHTML = `<div class="spinner">
        <svg>
          <use href="src/img/icons.svg#icon-loader"></use>
        </svg>
      </div>`;

        try {
            const res = await fetch (`${API_URL}/${this.results.currentRecipeId}`);

            if (!res.ok)
                throw Error ("Something went wrong.");

            const data = await res.json ();

            this.recipe = data.data.recipe;
            
            for (const ingredient of this.recipe.ingredients)
                {
                    if (ingredient.quantity == null)
                        ingredient.quantity = 1;
                }
            renderRecipe ();
      
        }
        catch (err)
        {
            recipeEl.innerHTML = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div>`;
        }
        }
        results.onRecipeSet = fetchAndRenderRecipe;
    }

   
}