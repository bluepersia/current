import {API_URL, API_KEY} from '../utility.js';

export default class Search 
{
    constructor ()
    {
        this.onSearched = (data) => {}

        document.querySelector ('.search').addEventListener ('submit', (e) =>
        {
            e.preventDefault ();
            const formData = new FormData (e.target);

            const recipeName = formData.get("recipe");

            this.search (recipeName);

        });
    }
    async search (recipeName)
    {
        try {
            const res = await fetch (`${API_URL}?search=${recipeName}&key=${API_KEY}`)

            if (!res.ok)
                throw Error ('Something went wrong!');

            const data = await res.json ();

            this.onSearched(data.data.recipes);
        }
        catch (err)
        {
            console.error (err);
        }
    }
}