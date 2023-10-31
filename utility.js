export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
export const API_KEY = "632bdfee-a563-4af8-85fa-7d248d291968";

export function getRecipeHTML({id, image_url, title, publisher}, highlight = false) { 
    return `<li class="preview" data-id=${id}>
<a class="preview__link ${highlight ? "preview__link--active" : ""}" href="#${id}">
<figure class="preview__fig">
    <img src="${image_url}" alt="" />
</figure>
<div class="preview__data">
    <h4 class="preview__title">${title}</h4>
    <p class="preview__publisher">${publisher}</p>
    <div class="preview__user-generated">
    <svg>
        <use href="src/img/icons.svg#icon-user"></use>
    </svg>
    </div>
</div>
</a>
</li>`;
}