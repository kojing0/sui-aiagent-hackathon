import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { Ed25519Keypair, } from '@mysten/sui/keypairs/ed25519';
import { requestSuiFromFaucetV0 } from '@mysten/sui/faucet';

import 'dotenv/config'

const address = process.env.WALLET_ADDRESS!;

// Setting RPC Node
const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});


// **** Functions ****
async function getBlance() {

  const coins = await client.getCoins({ owner: address });

  let mistBalance = coins.data.reduce((sum, coin) => sum + BigInt(coin.balance), BigInt(0));

  // SUI単位に変換 (1 SUI = 1_000_000_000 MIST)
  const suiBalance = Number(mistBalance) / 1_000_000_000;

  console.log(`ウォレットアドレス: ${address}`);
  console.log(`現在の SUI 残高: ${suiBalance} SUI`);
}

async function getFaucet(walletAddress: string) {
  await requestSuiFromFaucetV0({
    host: 'https://faucet.testnet.sui.io',
    recipient: walletAddress,
  });
  console.log('Faucet から SUI を取得しました！');
}

export async function FetchNFT() {
  const mnmonic = process.env.MNEMONIC!;
  const keypair = Ed25519Keypair.deriveKeypair(mnmonic);
  // const address = keypair.toSuiAddress();


  // const walletAddress = args[0] as string;

  const packageObjectId = "0x789c351fb058e548da6bbf6c251b60270f5308c13f6d9ca8af313f8398bfb3ce";
  const tx = new Transaction();
  try {
    tx.moveCall({
      target: `${packageObjectId}::reward_nft::mint_and_transfer`,
      arguments: [
        tx.pure.string('Yambaru Kuina'),
        tx.pure.string('bafybeihaktd4harts2viw64x5pg5k5cp7mprztgtxdejmlpx7h7qymt3bm')
      ],
    });
    const result = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
    });

    const response = JSON.stringify([
      {
        reasoning: "Successfully minted Yanbaru Kuina NFT from Contract",
        response: `NFT Minted: ${JSON.stringify(result)}`,
        status: "success",
        query: "Fetch Yanbaru Kuina NFT",
        errors: [],
      },
    ]);

    console.log(response);

    return response;
  } catch (error: unknown) {
    console.error("Error:", error);
    return JSON.stringify([
      {
        reasoning: "NFT minting failed.",
        response: null,
        status: "error",
        query: "Fetch Yanbaru Kuina NFT",
        errors: [error instanceof Error ? error.message : String(error)],
      },
    ]);
  }
}


async function main() {
  await FetchNFT();
}

main().catch(console.error)