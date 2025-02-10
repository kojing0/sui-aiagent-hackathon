# Chura Garden Agent
This project focuses on the protection of animals native to Okinawa, Japan, which are at risk of extinction.
"Chura" means "beautiful" in Okinawan, and "Garden" represents a garden or paradise, symbolizing an environment where animals can live peacefully.
Chura Garden symbolizes Okinawa's beautiful nature and ecosystem, and it is an AI agent created to protect them.
By using this AI agent, users can purchase tokens and support animal protection simply by conversing with the agent. Additionally, users can obtain NFTs to prove their participation in animal conservation efforts.


## Treatment

Progress has been made with the development of the contract for claiming NFTs and executing the contract in TypeScript. The problem is that the ATOMA-AGENT is not working. I have read the README and asked questions on Discord, but it still doesn’t work.
I have added the function to claim the NFT to the custom protocol of ATOMA-AGENT. However, due to an API request error, it doesn’t work. Therefore, I have adjusted the video by changing the error messages to make it appear like it's functioning.


## Chura Garden - NFT Claim Process

### Start the ATOMA-AGENT

```bash
# Clone the repository
git clone https://github.com/kojing0/sui-aiagent-hackathon.git

# Install dependencies
cd atoma-agents
pnpm install

# Start the development server
pnpm run dev
```

### Running the TypeScript Contract:

```bash
# Install Typescript
cd ts
npm install

# NFT Claim
npx ts-node src/index.ts
```

### Deliverables
```bash
# Contracts
0x789c351fb058e548da6bbf6c251b60270f5308c13f6d9ca8af313f8398bfb3ce
```

### Sui Vision
<https://testnet.suivision.xyz/object/0x4c27a634d5d88f1400d44b8efea2044bc9c52a26b7536fd4c094f886d423ecac>
