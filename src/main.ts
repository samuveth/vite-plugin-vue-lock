import { createApp } from "vue";
import App from "./App.vue";
import LockPlugin from "./LockPlugin";

const connectors = {
  walletconnect: {
    id: "walletconnect",
    name: "WalletConnect",
    network: "1",
    options: {
      rpc: {
        "1": "https://cloudflare-eth.com",
        "4": "https://eth-rinkeby.alchemyapi.io/v2/twReQE9Px03E-E_N_Fbb3OVF7YgHxoGq",
        "42": "https://eth-kovan.alchemyapi.io/v2/QCsM2iU0bQ49eGDmZ7-Y--Wpu0lVWXSO",
      },
    },
    icon: "ipfs://QmZRVqHpgRemw13aoovP2EaQdVtjzXRaQGQZsCLXWaNn9x",
  },
};

createApp(App).use(LockPlugin, { connectors }).mount("#app");
