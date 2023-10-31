import Search from './components/search.js';
import Results from './components/results.js';
import Recipe from './components/recipe.js';

const search = new Search ();
const results = new Results (search);
const recipe = new Recipe (results);