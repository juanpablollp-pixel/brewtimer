import { useState, useEffect } from 'react';
import { useRecipes } from './hooks/useRecipes';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RatioCalculator from './components/RatioCalculator';
import Timer from './components/Timer';

export default function App() {
  const [view, setView] = useState('list'); // list | form | ratio | timer
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [timerRecipe, setTimerRecipe] = useState(null);
  const { recipes, saveRecipe, deleteRecipe } = useRecipes();

  // Apply saved theme
  useEffect(() => {
    const saved = localStorage.getItem('brewTimerTheme') || 'editorial';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const goToForm = (recipe = null) => { setEditingRecipe(recipe); setView('form'); };
  const goToTimer = (recipe) => { setTimerRecipe(recipe); setView('timer'); };
  const goToList = () => setView('list');
  const goToRatio = () => setView('ratio');

  return (
    <div className="app">
      {view === 'list' && (
        <RecipeList
          recipes={recipes}
          onNewRecipe={() => goToForm(null)}
          onEditRecipe={goToForm}
          onDeleteRecipe={deleteRecipe}
          onStartTimer={goToTimer}
          onRatioCalc={goToRatio}
        />
      )}
      {view === 'form' && (
        <RecipeForm
          recipe={editingRecipe}
          onSave={(r) => { saveRecipe(r); goToList(); }}
          onCancel={goToList}
        />
      )}
      {view === 'ratio' && (
        <RatioCalculator onBack={goToList} />
      )}
      {view === 'timer' && timerRecipe && (
        <Timer recipe={timerRecipe} onExit={goToList} />
      )}
    </div>
  );
}
