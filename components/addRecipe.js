export default class AddRecipe 
{
    constructor ()
    {
        document.body.addEventListener ('click', function ({target})
        {
            if (target.closest ('.nav__btn--add-recipe'))
            {
                document.querySelector ('.overlay').classList.remove ('hidden');
                document.querySelector ('.add-recipe-window').classList.remove ('hidden');
            }

            else if (target.closest ('.btn--close-modal') || !target.closest ('.add-recipe-window'))
            {
                document.querySelector ('.overlay').classList.add ('hidden');
                document.querySelector ('.add-recipe-window').classList.add ('hidden');
            }

        });
    }
}