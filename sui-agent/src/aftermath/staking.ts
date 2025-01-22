import { Aftermath } from 'aftermath-ts-sdk';

// Initialize Aftermath SDK for mainnet
const af = new Aftermath('MAINNET');
const staking = af.Staking();

/**
 * Gets user's staking positions
 * @param walletAddress - Address of the wallet to get positions for
 * @returns JSON string containing staking positions
 */
export async function getStakingPositions(
  walletAddress: string,
): Promise<string> {
  try {
    const positions = await staking.getStakingPositions({ walletAddress });
    return JSON.stringify([
      {
        reasoning:
          'Successfully retrieved staking positions from Aftermath Finance.',
        response: JSON.stringify(positions, null, 2),
        status: 'success',
        query: `Fetched staking positions for wallet: ${walletAddress}`,
        errors: [],
      },
    ]);
  } catch (error: any) {
    const errorId = Math.random().toString(36).substring(2, 15);
    return JSON.stringify([
      {
        reasoning:
          'The system encountered an issue while trying to retrieve staking positions.',
        response: 'The attempt to fetch staking positions was unsuccessful.',
        status: 'failure',
        query: `Attempted to fetch staking positions for wallet: ${walletAddress}`,
        errors: [`Error with ID: #${errorId}: ${error.message}`],
      },
    ]);
  }
}

/**
 * Generates a staking transaction for SUI
 * @param walletAddress - Address of the wallet staking tokens
 * @param suiAmount - Amount of SUI to stake (in base units)
 * @param validatorAddress - Address of the validator to stake with
 * @returns JSON string containing staking transaction data
 */
export async function getStakeTransaction(
  walletAddress: string,
  suiAmount: bigint,
  validatorAddress: string,
): Promise<string> {
  try {
    const tx = await staking.getStakeTransaction({
      walletAddress,
      suiStakeAmount: suiAmount,
      validatorAddress,
    });
    return JSON.stringify([
      {
        reasoning: 'Successfully generated staking transaction.',
        response: JSON.stringify(tx, null, 2),
        status: 'success',
        query: `Generated stake transaction for ${suiAmount} SUI with validator ${validatorAddress}`,
        errors: [],
      },
    ]);
  } catch (error: any) {
    const errorId = Math.random().toString(36).substring(2, 15);
    return JSON.stringify([
      {
        reasoning:
          'The system encountered an issue while trying to generate the staking transaction.',
        response:
          'The attempt to generate staking transaction was unsuccessful.',
        status: 'failure',
        query: `Attempted to generate stake transaction for ${suiAmount} SUI`,
        errors: [`Error with ID: #${errorId}: ${error.message}`],
      },
    ]);
  }
}

/**
 * Generates an unstaking transaction for afSUI
 * @param walletAddress - Address of the wallet unstaking tokens
 * @param afSuiAmount - Amount of afSUI to unstake (in base units)
 * @param isAtomic - Whether to perform atomic unstaking
 * @returns JSON string containing unstaking transaction data
 */
export async function getUnstakeTransaction(
  walletAddress: string,
  afSuiAmount: bigint,
  isAtomic = true,
): Promise<string> {
  try {
    const tx = await staking.getUnstakeTransaction({
      walletAddress,
      afSuiUnstakeAmount: afSuiAmount,
      isAtomic,
    });
    return JSON.stringify([
      {
        reasoning: 'Successfully generated unstaking transaction.',
        response: JSON.stringify(tx, null, 2),
        status: 'success',
        query: `Generated unstake transaction for ${afSuiAmount} afSUI`,
        errors: [],
      },
    ]);
  } catch (error: any) {
    const errorId = Math.random().toString(36).substring(2, 15);
    return JSON.stringify([
      {
        reasoning:
          'The system encountered an issue while trying to generate the unstaking transaction.',
        response:
          'The attempt to generate unstaking transaction was unsuccessful.',
        status: 'failure',
        query: `Attempted to generate unstake transaction for ${afSuiAmount} afSUI`,
        errors: [`Error with ID: #${errorId}: ${error.message}`],
      },
    ]);
  }
}

/**
 * Gets total SUI TVL in staking
 * @returns JSON string containing TVL information
 */
export async function getSuiTvl(): Promise<string> {
  try {
    const tvl = await staking.getSuiTvl();
    return JSON.stringify([
      {
        reasoning: 'Successfully retrieved SUI TVL information.',
        response: tvl.toString(),
        status: 'success',
        query: 'Fetched total SUI TVL in staking',
        errors: [],
      },
    ]);
  } catch (error: any) {
    const errorId = Math.random().toString(36).substring(2, 15);
    return JSON.stringify([
      {
        reasoning:
          'The system encountered an issue while trying to retrieve TVL information.',
        response: 'The attempt to fetch TVL was unsuccessful.',
        status: 'failure',
        query: 'Attempted to fetch total SUI TVL in staking',
        errors: [`Error with ID: #${errorId}: ${error.message}`],
      },
    ]);
  }
}

/**
 * Gets current afSUI exchange rate
 * @returns JSON string containing exchange rate information
 */
export async function getAfSuiExchangeRate(): Promise<string> {
  try {
    const rate = await staking.getAfSuiToSuiExchangeRate();
    return JSON.stringify([
      {
        reasoning: 'Successfully retrieved afSUI exchange rate.',
        response: rate.toString(),
        status: 'success',
        query: 'Fetched current afSUI to SUI exchange rate',
        errors: [],
      },
    ]);
  } catch (error: any) {
    const errorId = Math.random().toString(36).substring(2, 15);
    return JSON.stringify([
      {
        reasoning:
          'The system encountered an issue while trying to retrieve exchange rate.',
        response: 'The attempt to fetch exchange rate was unsuccessful.',
        status: 'failure',
        query: 'Attempted to fetch afSUI exchange rate',
        errors: [`Error with ID: #${errorId}: ${error.message}`],
      },
    ]);
  }
}
