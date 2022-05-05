import type { ConnectorOptions } from "./types";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

export default class Connector {
  public options: ConnectorOptions;

  constructor(options: ConnectorOptions) {
    this.options = options;
  }

  async connect(): Promise<void | ExternalProvider | JsonRpcFetchFunc> {
    return;
  }

  logout(): void {
    return;
  }

  async isLoggedIn(): Promise<boolean | void> {
    return;
  }
}
