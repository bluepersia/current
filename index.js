import Search from './components/search.js';
import Results from './components/results.js';
import Recipe from './components/recipe.js';
import Bookmarks from "./components/bookmarks.js";
import AddRecipe from './components/addRecipe.js';

const search = new Search ();
const results = new Results (search);
const bookmarks = new Bookmarks ();
const recipe = new Recipe (results, bookmarks);
const addRecipe = new AddRecipe ();
