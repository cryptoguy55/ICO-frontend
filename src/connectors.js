import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 43114, 137, 25, 250]
});

const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://eth-mainnet.public.blastapi.io`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  infuraId: process.env.REACT_APP_INFURA_KEY
});

const walletlink = new WalletLinkConnector({
  url: `https://eth-mainnet.public.blastapi.io`,
  appName: "web3-react-demo"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
