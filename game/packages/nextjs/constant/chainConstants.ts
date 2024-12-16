import { http } from "viem";
import {baseSepolia,celoAlfajores,mantleSepoliaTestnet,scrollSepolia,morphSepolia} from "wagmi/chains";
const rootstockTestnet = {
  id: 31,
  name: "Rootstock Testnet",
  iconUrl:"https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
  nativeCurrency: { name: "Rootstock", symbol: "tRBTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co/"] },
  },
  blockExplorers: {
    default: { name: "Rootstock Testnet", url: "https://explorer.testnet.rsk.co/" },
  },
}
const romeTestnetNetwork = {
  id: 200002,
  name: "Rome Testnet",
  iconUrl: "https://example.com/rome-icon.png", // Replace with the actual icon URL if available
  nativeCurrency: { name: "Rome", symbol: "ROME", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rome.testnet.romeprotocol.xyz"] },
  },
  blockExplorers: {
    default: { name: "Rome Testnet Explorer", url: "https://rome.testnet.romeprotocol.xyz/explorer" }, // Placeholder URL
  },
};

const taikoHeklaTestnet = {
  id: 167009,
  name: "Taiko Hekla L2",
  iconUrl: "https://rpc.hekla.taiko.xyz/", // Replace with the actual icon URL if available
  nativeCurrency: { name: "Taiko Hekla L2", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://blockscoutapi.hekla.taiko.xyz/"] },
  },
  blockExplorers: {
    default: { name: "Taiko Hekla L2", url: "https://blockscoutapi.hekla.taiko.xyz/" }, // Placeholder URL
  },
};


const incoRivestTestnet = {
  id: 21097,
  name: "Inco Rivest Testnet",
  iconUrl: "https://docs.inco.org/~gitbook/image?url=https%3A%2F%2F2921198789-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fb3FC48Xiy8fSq6XARds8%252Ficon%252FQlrBRTtastb5mRQNLhpk%252Fsymbol_brand.png%3Falt%3Dmedia%26token%3D79eebbe3-7881-4b26-bafc-13325a6c080d&width=32&dpr=2&quality=100&sign=428413e3&sv=1", // Replace with the correct logo if available
  nativeCurrency: { name: "Inco", symbol: "INCO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://validator.rivest.inco.org/"] },
  },
  blockExplorers: {
    default: { name: "Rivest Explorer", url: "https://explorer.rivest.inco.org/" },
  },
};
const chilizSpicyTestnet = {
  id: 88882,
  name: "Chiliz Spicy Testnet",
  iconUrl: "https://docs.chiliz.com/~gitbook/image?url=https%3A%2F%2F702624341-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fcollections%252FEcN1NveIcFEPGuwVgBgo%252Ficon%252FgH0g4DQaH1SB2SuNi5Kx%252FCHZ%2520Square%2520Icon.png%3Falt%3Dmedia%26token%3Dc34024d6-2e22-44b8-b5e6-03cecbb755e0&width=32&dpr=2&quality=100&sign=48f8be9d&sv=1", // Replace with a relevant icon URL if available
  nativeCurrency: { name: "Chiliz", symbol: "CHZ", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://spicy-rpc.chiliz.com/"] },
    alternative: { http: ["https://chiliz-spicy.publicnode.com"] },
  },
  webSockets: {
    default: { ws: ["wss://spicy-rpc-ws.chiliz.com/"] },
    alternative: { ws: ["wss://chiliz-spicy.publicnode.com"] },
  },
  blockExplorers: {
    default: { name: "Spicy Block Explorer", url: "https://testnet.chiliscan.com/" },
    alternative: { name: "Spicy Explorer", url: "http://spicy-explorer.chiliz.com/" },
  },
};

const flowTestnetNetwork ={
  id: 545,
  name: "Flow Testnet",
  iconUrl:"https://s2.coinmarketcap.com/static/img/coins/64x64/4558.png",
  nativeCurrency: { name: "Flow", symbol: "FLOW", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.evm.nodes.onflow.org/"] },
  },
  blockExplorers: {
    default: { name: "Flow Testnet", url: "https://evm-testnet.flowscan.io/" },
  },
}
const zircuitTestnetNetwork = {
  id: 48899,
  name: "Zircuit Testnet",
  iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022", // Placeholder icon URL for ETH
  nativeCurrency: { name: "Zircuit", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://zircuit1-testnet.p2pify.com"] },
  },
  blockExplorers: {
    default: { name: "Zircuit Testnet Explorer", url: "https://explorer.zircuit.com/" },
  },
};



const neoTestnetNetwork = {
  id: 245022926,
  name: "Neon EVM DevNet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/9046.png", // Placeholder icon URL for Neon
  nativeCurrency: { name: "Neon", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.neonevm.org"] },
  },
  blockExplorers: {
    default: { name: "Neon DevNet Explorer", url: "https://devnet.neonscan.org" },
  },
};
const morphHoleskyNetwork = {
  id: 2810,
  name: "Morph Holesky",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", // Placeholder icon URL for ETH
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-quicknode-holesky.morphl2.io"] },
  },
  blockExplorers: {
    default: { name: "Morph Holesky Explorer", url: "https://explorer-holesky.morphl2.io" },
  },
};
const bleTestnetNetwork = {
  id: 52085143,
  name: "BLE Testnet",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/4584.png", // Placeholder icon URL for ETH
  nativeCurrency: { name: "BLE", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.rpc.ethena.fi/"] },
  },
  blockExplorers: {
    default: { name:  "BLE Testnet", url: "https://testnet.explorer.ethena.fi/" },
  },
};

export const chainArray = [taikoHeklaTestnet,rootstockTestnet,bleTestnetNetwork];
export const transportsObject = {
  [taikoHeklaTestnet.id]: http(),
  [rootstockTestnet.id]: http(),
  [bleTestnetNetwork.id]: http(),
  // [baseSepolia.id]: http(),
  // [flowTestnetNetwork.id]: http(),
  // [celoAlfajores.id]: http(),
  // [chilizSpicyTestnet.id]: http(),
  // [incoRivestTestnet.id]: http(),
  // [mantleSepoliaTestnet.id]: http(),
  // [scrollSepolia.id]: http(),
  // [neoTestnetNetwork.id]: http(),
  // [morphSepolia.id]: http(),
  // [morphHoleskyNetwork.id]: http(),
  // [romeTestnetNetwork.id]: http(),
  // [zircuitTestnetNetwork.id]: http(),
};
