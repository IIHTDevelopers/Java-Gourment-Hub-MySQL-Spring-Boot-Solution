import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage';
import RecipeList from './components/recipes/RecipeList';
import LoginPage from './pages/LoginPage';
import FavoriteRecipes from './components/recipes/FavoriteRecipes';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipes" exact component={RecipeList} />
          <Route path="/recipes/:id" component={RecipePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/favorites" component={FavoriteRecipes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
