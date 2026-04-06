import { useState } from 'react';

const HISTORY_KEY = 'brewHistory';

// Standalone function — call from anywhere (e.g. Timer.jsx) without a hook
export function saveBrewToHistory(recipe, timeDelta, totalTime = 0) {
  const entry = {
    id: Date.now(),
    recipeId: recipe.id,
    recipeName: recipe.name,
    method: recipe.method,
    date: new Date().toISOString(),
    coffee: recipe.coffee,
    water: recipe.water,
    temperature: recipe.temp,
    ratio: recipe.ratio,
    totalTime,
    timeDelta: timeDelta ?? { type: null, seconds: null },
  };
  try {
    const existing = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...existing]));
  } catch {
    // localStorage not available
  }
}

// Hook for reading and deleting history entries (used by BrewKnowledge)
export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const deleteBrewEntry = (id) => {
    const updated = history.filter((e) => e.id !== id);
    setHistory(updated);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // localStorage not available
    }
  };

  const updateBrewEntry = (id, patch) => {
    const updated = history.map((e) => e.id === id ? { ...e, ...patch } : e);
    setHistory(updated);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // localStorage not available
    }
  };

  return { history, deleteBrewEntry, updateBrewEntry };
}
