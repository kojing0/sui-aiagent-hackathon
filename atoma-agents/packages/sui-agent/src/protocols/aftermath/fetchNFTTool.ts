import { Ed25519Keypair, } from '@mysten/sui/keypairs/ed25519';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

import { handleError } from '../../utils';

const client = new SuiClient({
  url: getFullnodeUrl('devnet'),
});
const keypair = new Ed25519Keypair();
const packageObjectId = "0x92658318e8e769c25c2b1dbca082b4ec81e3caaa145009ae744699e4dc03ecb1";

/**
 * Gets NFT from Contract
 * @param walletAddress - WalletAddress
 * @returns NFT or error message
 */
export async function FetchNFT(
  ...args: (string | number | bigint | boolean)[]
): Promise<string> {
  const walletAddress = args[0] as string;
  const tx = new Transaction();
  try {
    tx.moveCall({
      target: `${packageObjectId}::bird_nft::mint_and_transfer`,
      arguments: [tx.pure.string('Yambaru Kuina'), tx.pure.string('bafybeihaktd4harts2viw64x5pg5k5cp7mprztgtxdejmlpx7h7qymt3bm')],
    });
    const result = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
    });

    return JSON.stringify([
      {
        reasoning:
          'Successfully Yanbar Quina NFT from Contract',
        response: `The NFT Response of ${result}`,
        status: 'success',
        query: `Fetch Yanbaru Quina NFT`,
        errors: [],
      },
    ]);
  } catch (error: unknown) {
    return JSON.stringify([
      handleError(error, {
        reasoning: 'NFT could not be obtained.',
        query: `Tried to get NFT for ${walletAddress}`,
      }),
    ]);
  }
}
