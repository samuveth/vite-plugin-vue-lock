import { mount } from "@vue/test-utils";
import LockPlugin from "@/LockPlugin";
import { getInstance } from "@/LockPlugin";
import { test, expect } from "vitest";

const App = {};

const connectors = {
  injected: {
    id: "injected",
    name: "MetaMask",
  },
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

mount(App, {
  global: {
    plugins: [[LockPlugin, { connectors }]],
  },
});

test("is installed", async () => {
  const auth = getInstance();
  expect(auth).toBeDefined();
});

test("get walletconnect connector", async () => {
  const auth = getInstance();
  const connector = auth.getLockConnector("walletconnect");
  expect(connector).toBeDefined();
  expect(connector.options).toBeDefined();
  expect(connector.options.rpc).toBeDefined();
  expect(connector.options.rpc?.["1"]).toBeTypeOf("string");
});

test("get injected connector", async () => {
  const auth = getInstance();
  const connector = auth.getLockConnector("injected");
  expect(connector).toBeDefined();
  expect(connector.options).toBeUndefined();
});
