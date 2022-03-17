import create from 'zustand';

export const usePlanets = create((set) => ({
  planets: [],
  setPlanets: (planet) => {
    set((state) => ({
      planets: [...state.planets, planet],
    }));
  },
}));
