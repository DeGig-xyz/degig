import { create } from "zustand";
import { BrowserWallet } from "@meshsdk/core";

export interface WalletStoreType {
  walletId: string | null;
  walletIcon: string | null;
  address: string | null;
  browserWallet: BrowserWallet | null;
  connect: (walletId: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useWallet = create<WalletStoreType>((set, get) => ({
  address: null,
  walletId: null,
  walletIcon: null,
  browserWallet: null,

  connect: async (walletId: string) => {
    const browserWallet: BrowserWallet = await BrowserWallet.enable(walletId);

    if (!browserWallet) {
      throw new Error("Failed to connect wallet");
    }

    const address = await browserWallet.getChangeAddress();
    if (!address) {
      throw new Error("Failed to get address");
    }

    const stakeAddress = await browserWallet.getRewardAddresses();
    if (!stakeAddress) {
      throw new Error("Failed to get stake address");
    }

    const walletIcon = await BrowserWallet.getAvailableWallets().then((wallets) => {
      const wallet = wallets.find((w) => w.id === walletId);
      return wallet ? wallet.icon : null;
    });

    localStorage.setItem("CWallet", walletId);

    set({
      walletId: walletId,
      walletIcon: walletIcon,
      address: address,
      browserWallet: browserWallet,
    });
  },

  signTx: async (unsignedTx: string) => {
    const { browserWallet } = get();
    if (!browserWallet) {
      throw new Error("Wallet not connected");
    }
    const signedTx = await browserWallet.signTx(unsignedTx);
    if (!signedTx) {
      throw new Error("Failed to sign data");
    }
    return signedTx;
  },

  submitTx: async (signedTx: string) => {
    const { browserWallet } = get();
    if (!browserWallet) {
      throw new Error("Wallet not connected");
    }
    const txHash = await browserWallet.submitTx(signedTx);
    if (!txHash) {
      throw new Error("Failed to submit transaction");
    }
    return txHash;
  },

  disconnect: async () => {
    localStorage.removeItem("CWallet");
    set({ browserWallet: null, walletId: null, walletIcon: null, address: null });
  },
}));
