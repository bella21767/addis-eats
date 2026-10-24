export const DELIVERY_FEE = 50; // ETB, change this to your real delivery fee

export function calcTotals(items) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  return { subtotal, delivery, total: subtotal + delivery };
}