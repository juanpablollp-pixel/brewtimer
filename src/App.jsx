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

// dir: 1 = avanzar (entra desde derecha), -1 = retroceder (entra desde izquierda)
const pageVariants = {
  initial: (dir) => ({ opacity: 0, x: dir * 40 }),
  animate: { opacity: 1, x: 0 },
  exit:    (dir) => ({ opacity: 0, x: dir * -40 }),
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.25,
};

export default function App() {
  const [view, setView] = useState('list'); // list | form | ratio | timer | knowledge | flavor-wheel | flavor-checklist
  const [direction, setDirection] = useState(1); // 1 = avanzar, -1 = retroceder
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

  // Avanzar → nueva pantalla entra desde la derecha
  const navigateTo = (newView) => { setDirection(1);  setView(newView); };
  // Retroceder → nueva pantalla entra desde la izquierda
  const navigateBack = (newView) => { setDirection(-1); setView(newView); };

  const goToForm      = (recipe = null) => { setEditingRecipe(recipe); navigateTo('form'); };
  const goToTimer     = (recipe) => { setTimerRecipe(recipe); navigateTo('timer'); };
  const goToList      = () => navigateBack('list');
  const goToRatio     = () => navigateTo('ratio');
  const goToKnowledge = () => navigateTo('knowledge');
  const goToFlavorWheel = () => navigateTo('flavor-wheel');

  // Called by BrewDetail to open the checklist
  const openChecklist = (currentNotes, setFlavorNotes) => {
    checklistCallbackRef.current = setFlavorNotes;
    setChecklistInitial(currentNotes);
    navigateTo('flavor-checklist');
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
    navigateBack('knowledge');
  };

  const handleChecklistBack = () => {
    checklistCallbackRef.current = null;
    navigateBack('knowledge');
  };

  const handleUpdateBrew = (id, updates) => {
    setSelectedBrew(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  };

  const pageProps = {
    variants: pageVariants,
    custom: direction,
    initial: 'initial',
    animate: 'animate',
    exit: 'exit',
    transition: pageTransition,
  };

  return (
    <div className="app" style={{ overflow: 'hidden' }}>
      <AnimatePresence mode="wait" custom={direction}>
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
