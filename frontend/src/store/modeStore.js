import { create } from 'zustand';

const useModeStore = create((set) => ({
  mode: 'shoes', // 'shoes' | 'slippers'
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
