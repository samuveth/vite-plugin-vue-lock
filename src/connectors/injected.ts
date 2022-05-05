import Connector from "../connector";
import type { ConnectorOptions } from "../types";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

export default class LockConnector extends Connector {
  constructor(options: ConnectorOptions) {
    super(options);
  }

  async connect(): Promise<void | ExternalProvider | JsonRpcFetchFunc> {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.error(e);
        if ((e as { code: number }).code === 4001) return;
      }
      return window.ethereum;
    }

    if (window.web3) {
      return window.web3.currentProvider;
    }
    return;
  }

  async isLoggedIn() {
    if (!window.ethereum) return false;
    if (window.ethereum.selectedAddress) return true;
    await new Promise((r) => setTimeout(r, 400));
    return !!window.ethereum.selectedAddress;
  }
}
