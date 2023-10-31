import { getRecipeHTML } from '../utility.js';

export default class Bookmarks 
{
    constructor ()
    {
        this.bookmarks = JSON.parse (localStorage.getItem ('bookmarks')) || [];
        
        this.renderBookmarks ();
    }

    renderBookmarks ()
    {
        const bookmarksList = document.querySelector ('.bookmarks__list');
        if (this.bookmarks.length > 0)
            bookmarksList.innerHTML = this.bookmarks.map (bookmark => getRecipeHTML (bookmark)).join ('');
        else 
            bookmarksList.innerHTML = `<div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>
              No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
          </div>`
        
    }

    bookmark (recipe)
    {
        const index = this.bookmarks.findIndex (r => r.id == recipe.id);

        if (index == -1)
        {
            this.bookmarks.push (recipe);
        }
        else 
        {
            this.bookmarks.splice (index, 1);
        }

        localStorage.setItem ('bookmarks', JSON.stringify (this.bookmarks));

        this.renderBookmarks ();
    }


}