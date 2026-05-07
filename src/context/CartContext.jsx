import { createContext, useContext, useMemo, useState } from 'react';
import { content } from '../content';

const STORAGE_KEY = 'fass-cart-state-v1';

const CartContext = createContext(null);

function getItemTitle(item) {
  return item.nombre || item.name || item.title || '';
}

function normalizeCartItem(item) {
  return {
    ...item,
    title: getItemTitle(item),
  };
}

function formatPrice(value) {
  return new Intl.NumberFormat('es-AR').format(Math.round(value || 0));
}

function buildWhatsAppMessage(cartItems, subtotal, totalQuantity, paymentMethodLabel, adjustment, adjustmentPercentage) {
  const lines = [content.catalogo.cart.messageIntro, ''];

  cartItems.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.title} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`,
    );
  });

  lines.push('');
  lines.push(`Subtotal: $${formatPrice(subtotal)}`);

  if (adjustment !== 0) {
    const adjustmentLabel = adjustment > 0 ? 'Recargo' : 'Descuento';
    lines.push(`${adjustmentLabel} (${adjustmentPercentage}%): ${adjustment > 0 ? '+' : ''}$${formatPrice(adjustment)}`);
  }

  const finalTotal = subtotal + adjustment;

  lines.push('');
  lines.push(`${content.catalogo.cart.totalLabel}: $${formatPrice(finalTotal)}`);
  lines.push(`Metodo de pago: ${paymentMethodLabel}`);
  lines.push(`${content.catalogo.cart.itemsLabel}: ${totalQuantity}`);
  lines.push('');
  lines.push(content.catalogo.cart.messageFooter);

  return lines.join('\n');
}

function normalizeWhatsAppNumber(rawNumber) {
  const digits = String(rawNumber || '').replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  if (digits.startsWith('549')) {
    return digits;
  }

  if (digits.startsWith('54')) {
    return `549${digits.slice(2)}`;
  }

  if (digits.length === 10 && digits.startsWith('11')) {
    return `549${digits}`;
  }

  return digits;
}

function readStoredState() {
  if (typeof window === 'undefined') {
    return {
      cartItems: [],
      paymentMethod: '',
      orderSent: false,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        cartItems: [],
        paymentMethod: '',
        orderSent: false,
      };
    }

    const parsed = JSON.parse(raw);

    return {
      cartItems: Array.isArray(parsed.cartItems) ? parsed.cartItems.map(normalizeCartItem) : [],
      paymentMethod: typeof parsed.paymentMethod === 'string' ? parsed.paymentMethod : '',
      orderSent: Boolean(parsed.orderSent),
    };
  } catch {
    return {
      cartItems: [],
      paymentMethod: '',
      orderSent: false,
    };
  }
}

function persistState(nextState) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}

export function CartProvider({ children }) {
  const initialState = readStoredState();

  const [cartItems, setCartItems] = useState(initialState.cartItems);
  const [paymentMethod, setPaymentMethod] = useState(initialState.paymentMethod);
  const [orderSent, setOrderSent] = useState(initialState.orderSent);

  const updateCartState = (nextCartItems, nextPaymentMethod = paymentMethod, nextOrderSent = orderSent) => {
    setCartItems(nextCartItems);
    setPaymentMethod(nextPaymentMethod);
    setOrderSent(nextOrderSent);

    persistState({
      cartItems: nextCartItems,
      paymentMethod: nextPaymentMethod,
      orderSent: nextOrderSent,
    });
  };

  const addItem = (item) => {
    if (orderSent) {
      return;
    }

    const title = getItemTitle(item);
    const price = item.price ?? item.precio ?? 0;
    const image = item.imagen || item.image || '';

    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      updateCartState(
        cartItems.map((cartItem) => (
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )),
      );
      return;
    }

    updateCartState([
      ...cartItems,
      {
        id: item.id,
        title,
        image,
        price,
        quantity: 1,
      },
    ]);
  };

  const increaseQuantity = (itemId) => {
    if (orderSent) {
      return;
    }

    updateCartState(
      cartItems.map((cartItem) => (
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )),
    );
  };

  const decreaseQuantity = (itemId) => {
    if (orderSent) {
      return;
    }

    updateCartState(
      cartItems
        .map((cartItem) => {
          if (cartItem.id !== itemId) {
            return cartItem;
          }

          return { ...cartItem, quantity: cartItem.quantity - 1 };
        })
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const removeItem = (itemId) => {
    if (orderSent) {
      return;
    }

    updateCartState(cartItems.filter((cartItem) => cartItem.id !== itemId));
  };

  const clearCart = () => {
    if (orderSent) {
      return;
    }

    updateCartState([]);
  };

  const restartOrder = () => {
    updateCartState([], '', false);
  };

  const updatePaymentMethod = (nextMethod) => {
    setPaymentMethod(nextMethod);
    persistState({
      cartItems,
      paymentMethod: nextMethod,
      orderSent,
    });
  };

  const totals = useMemo(() => {
    const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    let adjustment = 0;
    let adjustmentPercentage = 0;

    if (paymentMethod) {
      const selectedMethod = content.catalogo.cart.paymentMethods.find(
        (method) => method.value === paymentMethod,
      );

      if (selectedMethod && selectedMethod.percentage) {
        adjustmentPercentage = selectedMethod.percentage;
        adjustment = subtotal * (adjustmentPercentage / 100);
      }
    }

    const total = subtotal + adjustment;

    return {
      quantity,
      subtotal,
      adjustment,
      adjustmentPercentage,
      total,
    };
  }, [cartItems, paymentMethod]);

  const sendOrder = () => {
    if (cartItems.length === 0 || !paymentMethod || orderSent) {
      return false;
    }

    const selectedMethod = content.catalogo.cart.paymentMethods.find(
      (method) => method.value === paymentMethod,
    );

    const message = buildWhatsAppMessage(
      cartItems,
      totals.subtotal,
      totals.quantity,
      selectedMethod?.label || paymentMethod,
      totals.adjustment,
      totals.adjustmentPercentage,
    );

    const normalizedPhone = normalizeWhatsAppNumber(content.catalogo.cart.whatsappNumber);

    if (!normalizedPhone) {
      return false;
    }

    const whatsappUrl = `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;

    setOrderSent(true);
    persistState({
      cartItems,
      paymentMethod,
      orderSent: true,
    });

    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    return true;
  };

  const value = {
    cartItems,
    paymentMethod,
    orderSent,
    totals,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    restartOrder,
    setPaymentMethod: updatePaymentMethod,
    sendOrder,
    getItemQuantity: (itemId) => cartItems.find((item) => item.id === itemId)?.quantity || 0,
    isItemInCart: (itemId) => cartItems.some((item) => item.id === itemId),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}
