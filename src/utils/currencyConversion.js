export const EXCHANGE_RATES = {
    INR: 1,
    USD: 83.5,
    EUR: 90.2,
    GBP: 105.4,
    JPY: 0.55,
    AUD: 54.3,
    CAD: 61.2,
    SGD: 62.1,
    AED: 22.7,
    CHF: 94.5
};

export const convertCurrency = (amount, fromCurrency, toCurrency = 'INR') => {
    if (!amount) return 0;
    const from = fromCurrency || 'INR';
    const to = toCurrency || 'INR';

    if (from === to) return amount;

    const fromRate = EXCHANGE_RATES[from] || 1;
    const toRate = EXCHANGE_RATES[to] || 1;

    // Convert to base (INR) first, then to target currency
    const inBase = amount * fromRate;
    return inBase / toRate;
};
