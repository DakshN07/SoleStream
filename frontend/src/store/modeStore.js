import { create } from 'zustand';

const getInitialMode = () => {
  const defaultMode = import.meta.env.VITE_DEFAULT_MODE || 'shoes';
  if (defaultMode === 'slippers') {
    document.documentElement.classList.add('dark');
  }
  return defaultMode;
};

const useModeStore = create((set) => ({
  mode: getInitialMode(), // Initializes based on environment (Shoes or Slippers)
  toggleMode: () => set((state) => {
    const newMode = state.mode === 'shoes' ? 'slippers' : 'shoes';
    console.log(`ACTIVATED SECRET PROTOCOL: switched to ${newMode} mode.`);
    if (newMode === 'slippers') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { mode: newMode };
  })
}));

export default useModeStore;
