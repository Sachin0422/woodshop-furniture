import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS, ROOM_PRESETS, DEPARTMENTS } from '../utils/productsData';
import { playClickSound, playCartSound } from '../utils/audio';

const ShowroomContext = createContext();

export function ShowroomProvider({ children }) {
  const [inShowroom, setInShowroom] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState('all');

  // Real-time 3D material color choices for each piece across departments
  const [colorVariants, setColorVariants] = useState({
    sofa: PRODUCTS[0].colors[0],
    armchair: PRODUCTS[1].colors[0],
    'coffee-table': PRODUCTS[2].colors[0],
    'platform-bed': PRODUCTS[3].colors[0],
    nightstand: PRODUCTS[4].colors[0],
    wardrobe: PRODUCTS[5].colors[0],
    'study-desk': PRODUCTS[6].colors[0],
    bookshelf: PRODUCTS[7].colors[0],
    lamp: PRODUCTS[8].colors[0],
  });

  // Shopping cart
  const [cart, setCart] = useState([
    {
      product: PRODUCTS[3], // Japanese Platform Bed as signature item
      selectedColor: PRODUCTS[3].colors[0],
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Lighting & ambiance: 'day' or 'evening'
  const [lightingMode, setLightingMode] = useState('day');
  const [lampPower, setLampPower] = useState(true);

  // Camera tracking
  const [cameraView, setCameraView] = useState({
    position: [0, 4.2, 8.5],
    target: [0, 1.2, -0.5],
  });
  const [activePresetId, setActivePresetId] = useState('hall-overview');

  // Change product color swatch
  const setProductColor = (productId, colorObj) => {
    setColorVariants((prev) => ({
      ...prev,
      [productId]: colorObj,
    }));
    playClickSound();
  };

  // Focus on a specific product
  const focusProduct = (productId) => {
    const item = PRODUCTS.find((p) => p.id === productId);
    if (!item) return;

    setSelectedProductId(productId);
    setCameraView(item.cameraView);
    setActivePresetId(productId);
    if (item.department) {
      setActiveDepartment(item.department);
    }
    playClickSound();
  };

  // Close details panel and reset to active department preset or hall overview
  const closeProductPanel = () => {
    setSelectedProductId(null);
    const dept = DEPARTMENTS.find((d) => d.id === activeDepartment);
    if (dept && dept.presetId) {
      setPreset(dept.presetId);
    } else {
      setCameraView(ROOM_PRESETS[0]);
      setActivePresetId('hall-overview');
    }
    playClickSound();
  };

  // Select a camera preset view
  const setPreset = (presetId) => {
    const preset = ROOM_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(presetId);
    setCameraView({
      position: preset.position,
      target: preset.target,
    });

    // Sync active department if preset matches a department counter
    if (presetId === 'living-zone') setActiveDepartment('living');
    else if (presetId === 'bedroom-zone') setActiveDepartment('bedroom');
    else if (presetId === 'study-zone') setActiveDepartment('study');
    else if (presetId === 'lighting-zone') setActiveDepartment('lighting');
    else if (presetId === 'hall-overview' || presetId === 'dollhouse-view') setActiveDepartment('all');

    setSelectedProductId(null);
    playClickSound();
  };

  // Switch counter / department smoothly
  const focusDepartment = (deptId) => {
    setActiveDepartment(deptId);
    setSelectedProductId(null);

    const dept = DEPARTMENTS.find((d) => d.id === deptId);
    if (dept && dept.presetId) {
      setPreset(dept.presetId);
    } else {
      setPreset('hall-overview');
    }
    playClickSound();
  };

  // Cart operations
  const addToCart = (product, colorObj, qty = 1) => {
    const selectedColor = colorObj || colorVariants[product.id] || product.colors[0];
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === selectedColor.name
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qty,
        };
        return next;
      } else {
        return [...prev, { product, selectedColor, quantity: qty }];
      }
    });
    playCartSound();
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, colorName, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.name === colorName) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
    playClickSound();
  };

  const removeFromCart = (productId, colorName) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
    playClickSound();
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );

  return (
    <ShowroomContext.Provider
      value={{
        inShowroom,
        setInShowroom,
        selectedProductId,
        setSelectedProductId,
        hoveredProductId,
        setHoveredProductId,
        colorVariants,
        setProductColor,
        cart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        lightingMode,
        setLightingMode,
        lampPower,
        setLampPower,
        cameraView,
        activePresetId,
        setPreset,
        activeDepartment,
        setActiveDepartment,
        focusDepartment,
        focusProduct,
        closeProductPanel,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
}

export function useShowroom() {
  const context = useContext(ShowroomContext);
  if (!context) {
    throw new Error('useShowroom must be used within a ShowroomProvider');
  }
  return context;
}
