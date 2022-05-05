import { ref, type App, type Ref } from "vue";
import walletconnect from "./connectors/walletconnect";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

const lockConnectors: { [key: string]: typeof walletconnect } = {
  walletconnect,
};

const name = "lock";

let instance: {
  isAuthenticated: Ref<boolean>;
  provider: Ref<null | JsonRpcFetchFunc | ExternalProvider>;
  login: (id: string) => Promise<void>;
  logout: () => Promise<void>;
  getConnector: () => Promise<string | false>;
};

export const useLock = ({ ...options }) => {
  if (instance) return instance;

  const isAuthenticated = ref(false);
  const provider = ref<null | JsonRpcFetchFunc | ExternalProvider>(null);

  function getLockConnector(id: string) {
    const connectorOptions = options.connectors[id].options;
    return new lockConnectors[id](connectorOptions);
  }

  async function login(id: string): Promise<void> {
    const localProvider = await getLockConnector(id).connect();
    if (localProvider !== null) {
      provider.value = localProvider as JsonRpcFetchFunc | ExternalProvider;
    }
    if (provider.value) {
      localStorage.setItem(`_${name}.connector`, id);
      isAuthenticated.value = true;
    }
    return;
  }

  async function logout(): Promise<void> {
    const id = await getConnector();
    if (id) {
      getLockConnector(id).logout();
      localStorage.removeItem(`_${name}.connector`);
      isAuthenticated.value = false;
      provider.value = null;
    }
    return;
  }

  async function getConnector(): Promise<string | false> {
    const id = localStorage.getItem(`_${name}.connector`);
    if (id) {
      const isLoggedIn = await getLockConnector(id).isLoggedIn();
      return isLoggedIn ? id : false;
    }
    return false;
  }

  instance = {
    isAuthenticated,
    provider,
    login,
    logout,
    getConnector,
  };

  return instance;
};

export default {
  install(
    app: App,
    options: { connectors: { [key: string]: { id: string; name: string } } }
  ) {
    useLock(options);
  },
};

export const getInstance = () => instance;
