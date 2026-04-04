import { useState, useEffect } from 'react';

const DEFAULT_RECIPE = {
  id: 'v60-clasico',
  name: 'V60 Clásico',
  method: 'V60',
  coffee: 15,
  water: 250,
  temp: 93,
  grind: 'Media-Fina',
  roast: 'Medio',
  ratio: '1:16.7',
  steps: [
    { name: 'Vertido', type: 'vertido', targetWater: 50, duration: 30 },
    { name: 'Espera (Bloom)', type: 'espera', targetWater: 0, duration: 30 },
    { name: 'Vertido', type: 'vertido', targetWater: 100, duration: 60 },
    { name: 'Espera', type: 'espera', targetWater: 0, duration: 30 },
    { name: 'Vertido', type: 'vertido', targetWater: 100, duration: 60 },
  ],
};

const STORAGE_KEY = 'brewTimerRecipes';

export function useRecipes() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [DEFAULT_RECIPE];
    } catch {
      return [DEFAULT_RECIPE];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const saveRecipe = (recipe) => {
    setRecipes((prev) => {
      const exists = prev.find((r) => r.id === recipe.id);
      if (exists) {
        return prev.map((r) => (r.id === recipe.id ? recipe : r));
      }
      return [...prev, { ...recipe, id: Date.now().toString() }];
    });
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return { recipes, saveRecipe, deleteRecipe };
}
