import { useState, useEffect, useRef } from 'react';
import { useRecipes } from './hooks/useRecipes';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RatioCalculator from './components/RatioCalculator';
import Timer from './components/Timer';
import BrewKnowledge from './components/BrewKnowledge';
import FlavorWheel from './components/FlavorWheel';
import FlavorChecklist from './components/FlavorChecklist';

export default function App() {
  const [view, setView] = useState('list'); // list | form | ratio | timer | knowledge | flavor-wheel | flavor-checklist
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [timerRecipe, setTimerRecipe] = useState(null);
  const { recipes, saveRecipe, deleteRecipe } = useRecipes();

  // Checklist state lifted to App so BrewDetail can open it and receive results
  const checklistCallbackRef = useRef(null);
  const [checklistInitial, setChecklistInitial] = useState([]);

  // Apply saved theme
  useEffect(() => {
    const saved = localStorage.getItem('brewTimerTheme') || 'editorial';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const goToForm = (recipe = null) => { setEditingRecipe(recipe); setView('form'); };
  const goToTimer = (recipe) => { setTimerRecipe(recipe); setView('timer'); };
  const goToList = () => setView('list');
  const goToRatio = () => setView('ratio');
  const goToKnowledge = () => setView('knowledge');
  const goToFlavorWheel = () => setView('flavor-wheel');

  // Called by BrewDetail to open the checklist
  const openChecklist = (currentNotes, setFlavorNotes) => {
    checklistCallbackRef.current = setFlavorNotes;
    setChecklistInitial(currentNotes);
    setView('flavor-checklist');
  };

  const handleChecklistSave = (selection) => {
    if (checklistCallbackRef.current) {
      checklistCallbackRef.current(selection);
      checklistCallbackRef.current = null;
    }
    setView('knowledge');
  };

  const handleChecklistBack = () => {
    checklistCallbackRef.current = null;
    setView('knowledge');
  };

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
          onKnowledge={goToKnowledge}
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
      {view === 'knowledge' && (
        <BrewKnowledge
          onBack={goToList}
          onFlavorWheel={goToFlavorWheel}
          onOpenChecklist={openChecklist}
        />
      )}
      {view === 'flavor-wheel' && (
        <FlavorWheel onBack={goToKnowledge} />
      )}
      {view === 'flavor-checklist' && (
        <FlavorChecklist
          initialSelection={checklistInitial}
          onSave={handleChecklistSave}
          onBack={handleChecklistBack}
        />
      )}
    </div>
  );
}
