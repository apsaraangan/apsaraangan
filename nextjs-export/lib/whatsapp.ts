export function generateFourDigitOrderId(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function appendOrderIdToMessage(message: string): string {
  const orderId = generateFourDigitOrderId();
  return `Order ID: ${orderId}\n${message}`;
}
