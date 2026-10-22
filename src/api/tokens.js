/**
 * Token System & Payment Module
 */

// Token costs for features
export const TOKEN_COSTS = {
  AI_GENERATE_IMAGE: 2,
  AI_CHAT: 1,
  AI_ANALYZE_PHOTO: 3,
  ASTROLOGY_NATAL: 120,
  ASTROLOGY_COMPATIBILITY: 100,
  ASTROLOGY_HOROSCOPE: 0, // Free
  ASTROLOGY_QUESTION: 20
};

// Token packages (for purchase)
export const TOKEN_PACKAGES = [
  { tokens: 50, price: 1.99, currency: 'USD', popular: false },
  { tokens: 150, price: 4.99, currency: 'USD', popular: true },
  { tokens: 350, price: 9.99, currency: 'USD', popular: false },
  { tokens: 800, price: 19.99, currency: 'USD', popular: false },
  { tokens: 2000, price: 39.99, currency: 'USD', popular: false }
];

/**
 * Get user token balance
 */
export async function getUserBalance(userId) {
  // TODO: Database lookup
  return {
    userId,
    balance: 10, // Default free tokens
    totalEarned: 10,
    totalSpent: 0
  };
}

/**
 * Deduct tokens
 */
export async function deductTokens(userId, amount, reason = '') {
  const balance = await getUserBalance(userId);
  
  if (balance.balance < amount) {
    return { success: false, error: 'Недостаточно токенов', required: amount, current: balance.balance };
  }
  
  // TODO: Database transaction
  const newBalance = balance.balance - amount;
  
  return {
    success: true,
    previousBalance: balance.balance,
    deducted: amount,
    newBalance,
    transactionId: generateTransactionId()
  };
}

/**
 * Add tokens (purchase or gift)
 */
export async function addTokens(userId, amount, source = 'purchase') {
  // TODO: Database update
  return {
    success: true,
    added: amount,
    source,
    newBalance: amount + 10 // Simplified
  };
}

/**
 * Check if user can afford operation
 */
export async function canAfford(userId, feature) {
  const cost = TOKEN_COSTS[feature] || 0;
  if (cost === 0) return { canAfford: true, cost: 0 };
  
  const balance = await getUserBalance(userId);
  return {
    canAfford: balance.balance >= cost,
    cost,
    currentBalance: balance.balance
  };
}

/**
 * Generate unique transaction ID
 */
function generateTransactionId() {
  return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
