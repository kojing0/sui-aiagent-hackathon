import { Aftermath } from 'aftermath-ts-sdk';
import axios from 'axios';
import { COIN_ADDRESSES, COIN_SYNONYMS } from '../../@types/interface';
import { handleError } from '../utils';

const af = new Aftermath('MAINNET');
const prices = af.Prices();

/**
 * Normalizes a coin symbol by handling various formats and synonyms
 * @param symbol - Raw coin symbol input
 * @returns Normalized coin symbol or null if not recognized
 */
function normalizeCoinSymbol(symbol: string): string | null {
  const normalized = symbol
    .trim()
    .toUpperCase()
    .replace(/[^A-Z_]/g, '');
  return COIN_SYNONYMS[normalized] || null;
}

/**
 * Fetches current price for a single coin from CoinGecko
 * @param coin - Coin identifier (e.g., "bitcoin", "ethereum")
 * @returns Formatted price string or error message
 */
export async function getCoinPrice(coin: string): Promise<string> {
  try {
    interface CoinGeckoResponse {
      [key: string]: {
        usd: number;
      };
    }

    const response = await axios.get<CoinGeckoResponse>(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: coin,
          vs_currencies: 'usd',
        },
      },
    );

    const price = response.data[coin]?.usd;
    if (price !== undefined) {
      return JSON.stringify([
        {
          reasoning: 'Successfully retrieved current price from CoinGecko',
          response: `The current price of ${coin} is $${price}`,
          status: 'success',
          query: `Fetched price for ${coin}`,
          errors: [],
        },
      ]);
    } else {
      return JSON.stringify([
        handleError('Price not available', {
          reasoning:
            'The requested coin price was not found in the API response',
          query: `Attempted to fetch price for ${coin}`,
        }),
      ]);
    }
  } catch (error: unknown) {
    return JSON.stringify([
      handleError(error, {
        reasoning: 'Failed to fetch price from CoinGecko API',
        query: `Attempted to fetch price for ${coin}`,
      }),
    ]);
  }
}

/**
 * Gets price information for multiple coins from Aftermath Finance
 * @param coins - Comma-separated string of coin symbols or addresses
 * @returns JSON string containing price information or error response
 * @throws Error if price fetch fails or invalid token addresses
 */
export async function coinsToPrice(coins: string): Promise<string> {
  try {
    // Convert coin symbols to addresses
    const coinTypes = coins.split(',').map((coin) => {
      const trimmed = coin.trim();
      // Handle direct addresses
      if (trimmed.includes('::')) {
        return trimmed;
      }
      // Handle symbols
      const normalizedSymbol = normalizeCoinSymbol(trimmed);
      if (!normalizedSymbol) {
        throw new Error(`Unknown coin symbol: ${trimmed}`);
      }
      const address =
        COIN_ADDRESSES[normalizedSymbol as keyof typeof COIN_ADDRESSES];
      if (!address) {
        throw new Error(`No address mapping for coin: ${trimmed}`);
      }
      return address;
    });

    // Fetch prices from Aftermath
    const priceInfo = await prices.getCoinsToPrice({ coins: coinTypes });
    return JSON.stringify([
      {
        reasoning:
          'Successfully retrieved current price information from Aftermath Finance for the requested coins.',
        response: JSON.stringify(priceInfo, null, 2),
        status: 'success',
        query: `Fetched prices for coins: ${coins}`,
        errors: [],
      },
    ]);
  } catch (error: unknown) {
    return JSON.stringify([
      handleError(error, {
        reasoning: 'Failed to retrieve prices from Aftermath Finance',
        query: `Attempted to fetch prices for coins: ${coins}`,
      }),
    ]);
  }
}
