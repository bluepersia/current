import { getRecipeHTML } from '../utility.js';

export default class Results 
{
    constructor (search)
    {
        this.onRecipeSet = () => {};
        this.page = 1;
        this.totalPages = 1;

        const renderResults = () => {
            
            
            document.querySelector ('.results').innerHTML = this.recipes.slice ((this.page * 10) - 10, this.page * 10).map (recipe => getRecipeHTML(recipe, this.currentRecipeId == recipe.Id)).join ('');

            const paginationEl = document.querySelector ('.pagination');
            let paginationHTML = ``;
            if (this.page > 1)
                paginationHTML += `<button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${this.page - 1}</span>
              </button>`;
            
            if (this.page < this.totalPages)
                paginationHTML += `<button class="btn--inline pagination__btn--next">
                <span>Page ${this.page + 1}</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </button>`;
            
              paginationEl.innerHTML = paginationHTML;
            
        }

        search.onSearched = (recipes) => { 
            this.page = 1; 
            this.recipes = recipes; 
            this.totalPages = Math.ceil (this.recipes.length / 10); 
            renderResults ();
        };

        this.currentRecipeId = null;

        document.body.addEventListener ('click',  ({target}) =>
        {
            const preview = target.closest ('.preview');
            if (preview && preview.dataset.id)
            {
                this.currentRecipeId = preview.dataset.id;
                this.onRecipeSet ();
                renderResults (this.recipes);
            }
            else if (target.closest ('.pagination__btn--prev'))
            {
                this.page--;
                renderResults ();
            }
            else if (target.closest ('.pagination__btn--next'))
            {
                this.page++;
                console.log (this.page);
                renderResults ();
            }
        });
    }


   
}