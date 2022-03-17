import create from 'zustand';

export const useActivePlanet = create((set) => ({
  activePlanet: null,
  setActivePlanet: (planet) => set({ activePlanet: planet }),
}));
