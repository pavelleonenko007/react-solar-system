import { Vector3 } from 'three';
import create from 'zustand';

export const useCurve = create((set) => ({
  curveProps: {
    startPos: new Vector3(0, 200, 0),
    endPos: new Vector3(0, 200, 0),
  },
  setCurveProps: ({ startPos, endPos }) =>
    set({ curveProps: { startPos, endPos } }),
}));
