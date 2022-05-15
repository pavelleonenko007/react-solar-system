import create from 'zustand';

export const useActivePlanet = create((set) => ({
  activePlanet: null,
  observeMode: false,
  setObserveMode: (mode) => set((state) => ({ ...state, observeMode: mode })),
  setActivePlanet: (planet) => {
    console.log(planet);
    set((state) => ({ ...state, observeMode: false, activePlanet: planet }));
  },
}));
