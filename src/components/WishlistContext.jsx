import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCALSTORAGE EVERY CHANGE
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (p) => (p.id || p._id) === (item.id || item._id)
      );

      if (exists) {
        return prev.filter(
          (p) => (p.id || p._id) !== (item.id || item._id)
        );
      }

      return [...prev, item];
    });
  };

  const isWished = (id) => {
    return wishlist.some((p) => (p.id || p._id) === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWished }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);