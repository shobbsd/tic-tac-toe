import type {} from '@solana/wallet-adapter-base';
import type { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

/**
 * @description gets Phantom provider, if it exists
 */
export const getProvider = (): PhantomWalletAdapter | undefined => {
  if ('solana' in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomWalletAdapter;
  }
};

/**
 * @description prompts user to connect wallet if it exists
 */
export const connectWallet = async (): Promise<string | undefined> => {
  // @ts-ignore
  const { solana } = window;
  console.log(solana, 'soll');
  if (solana) {
    console.log('solana hers');
    const response = await solana.connect();
    console.log('wallet account ', response.publicKey.toString());
    return response.publicKey.toString();
  }
};

/**
 * @description disconnect Phantom wallet
 */
export const disconnectWallet = async () => {
  // @ts-ignore
  const { solana } = window;

  if (solana) {
    await (solana as PhantomWalletAdapter).disconnect();
  }
};
