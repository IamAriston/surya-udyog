import { useMemo } from "react";

// Random HSLA color generator
function generateRandomHSLA(opacity = 0.8) {
  const hue = Math.floor(Math.random() * 360); // 0-360
  const saturation = Math.floor(Math.random() * 50) + 50; // 50-100%
  const lightness = Math.floor(Math.random() * 30) + 40; // 40-70%
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
}

// Hook
export function useRandomColor(opacity = 0.8) {
  return useMemo(() => generateRandomHSLA(opacity), [opacity]);
}
