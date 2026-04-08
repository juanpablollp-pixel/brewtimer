import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecipes } from './hooks/useRecipes';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RatioCalculator from './components/RatioCalculator';
import Timer from './components/Timer';
import BrewKnowledge from './components/BrewKnowledge';
import FlavorWheel from './components/FlavorWheel';
import FlavorChecklist from './components/FlavorChecklist';

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -40 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.25,
};

export default function App() {
  const [view, setView] = useState('list'); // list | form | ratio | timer | knowledge | flavor-wheel | flavor-checklist
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [timerRecipe, setTimerRecipe] = useState(null);
  const [selectedBrew, setSelectedBrew] = useState(null);
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
    // Actualizar selectedBrew con los nuevos flavorNotes para que BrewDetail no los pierda
    setSelectedBrew(prev => prev ? {
      ...prev,
      sensorAnalysis: {
        ...(prev.sensorAnalysis ?? {}),
        flavorNotes: selection,
      }
    } : prev);
    setView('knowledge');
  };

  const handleChecklistBack = () => {
    checklistCallbackRef.current = null;
    setView('knowledge');
  };

  const handleUpdateBrew = (id, updates) => {
    setSelectedBrew(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const pageProps = {
    variants: pageVariants,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    transition: pageTransition,
  };

  return (
    <div className="app" style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div key="list" {...pageProps}>
            <RecipeList
              recipes={recipes}
              onNewRecipe={() => goToForm(null)}
              onEditRecipe={goToForm}
              onDeleteRecipe={deleteRecipe}
              onStartTimer={goToTimer}
              onRatioCalc={goToRatio}
              onKnowledge={goToKnowledge}
            />
          </motion.div>
        )}
        {view === 'form' && (
          <motion.div key="form" {...pageProps}>
            <RecipeForm
              recipe={editingRecipe}
              onSave={(r) => { saveRecipe(r); goToList(); }}
              onCancel={goToList}
            />
          </motion.div>
        )}
        {view === 'ratio' && (
          <motion.div key="ratio" {...pageProps}>
            <RatioCalculator onBack={goToList} />
          </motion.div>
        )}
        {view === 'timer' && timerRecipe && (
          <motion.div key="timer" {...pageProps}>
            <Timer recipe={timerRecipe} onExit={goToList} />
          </motion.div>
        )}
        {view === 'knowledge' && (
          <motion.div key="knowledge" {...pageProps}>
            <BrewKnowledge
              onBack={goToList}
              onFlavorWheel={goToFlavorWheel}
              onOpenChecklist={openChecklist}
              selectedBrew={selectedBrew}
              onSelectBrew={setSelectedBrew}
              onUpdateBrew={handleUpdateBrew}
            />
          </motion.div>
        )}
        {view === 'flavor-wheel' && (
          <motion.div key="flavor-wheel" {...pageProps}>
            <FlavorWheel onBack={goToKnowledge} />
          </motion.div>
        )}
        {view === 'flavor-checklist' && (
          <motion.div key="flavor-checklist" {...pageProps}>
            <FlavorChecklist
              initialSelection={checklistInitial}
              onSave={handleChecklistSave}
              onBack={handleChecklistBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
