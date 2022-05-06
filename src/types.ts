import type { Ref } from "vue";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";
import type walletconnect from "./connectors/walletconnect";
import type injected from "./connectors/injected";

export interface ConnectorOptions {
  rpc?: Record<string, any>;
}

export interface LockInstance {
  isAuthenticated: Ref<boolean>;
  provider: Ref<null | JsonRpcFetchFunc | ExternalProvider>;
  login: (id: string) => Promise<void>;
  logout: () => Promise<void>;
  getConnector: () => Promise<string | false>;
  getLockConnector: (id: string) => walletconnect | injected;
}
