import Connector from "../connector";
import type { ConnectorOptions } from "../types";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

export default class LockConnector extends Connector {
  constructor(options: ConnectorOptions) {
    super(options);
  }
  async connect(): Promise<void | ExternalProvider | JsonRpcFetchFunc> {
    let provider;
    try {
      const WalletConnectProvider = await import(
        "@walletconnect/web3-provider/dist/umd/index.min.js"
      );
      provider = new WalletConnectProvider.default(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = "walletconnect";
    return provider;
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem("walletconnect");
    }
    return;
  }
}
