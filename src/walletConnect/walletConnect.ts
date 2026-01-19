import { Core } from "@walletconnect/core";
import { WalletKit } from "@reown/walletkit";

const core = new Core({
  projectId: process.env.PROJECT_ID,
});

const walletKit = await WalletKit.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: "Demo React Native Wallet",
    description: "Demo RN Wallet to interface with Dapps",
    url: "www.walletconnect.com",
    icons: ["https://your_wallet_icon.png"],
    redirect: {
      native: "yourwalletscheme://",
    },
  },
});