import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addToCart: (item) => {
    const existItem = get().cartItems.find((x) => x.product === item.product && x.size === item.size);
    if (existItem) {
      set((state) => {
        const updated = state.cartItems.map((x) =>
          x.product === existItem.product && x.size === existItem.size ? item : x
        );
        localStorage.setItem('cartItems', JSON.stringify(updated));
        return { cartItems: updated };
      });
    } else {
      set((state) => {
        const updated = [...state.cartItems, item];
        localStorage.setItem('cartItems', JSON.stringify(updated));
        return { cartItems: updated };
      });
    }
  },
  removeFromCart: (id, size) => {
    set((state) => {
      const updated = state.cartItems.filter((x) => !(x.product === id && x.size === size));
      localStorage.setItem('cartItems', JSON.stringify(updated));
      return { cartItems: updated };
    });
  },
  clearCart: () => {
    localStorage.removeItem('cartItems');
    set({ cartItems: [] });
  }
}));

export default useCartStore;
