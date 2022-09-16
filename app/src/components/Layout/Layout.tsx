import { component$, Slot, $ } from '@builder.io/qwik';
import { connectWallet, disconnectWallet } from '../../utils/connection';
import { AppStore } from '../app/app';

interface LayoutProps {
  appStore: AppStore;
}

export const Layout = component$<LayoutProps>(({ appStore }) => {
  const handleConnect = $(async () => {
    try {
      const walletKey = await connectWallet();
      if (walletKey) {
        appStore.walletKey = walletKey;
        appStore.walletConnected = true;
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handleDisconnect = $(async () => {
    if (appStore.walletKey) {
      await disconnectWallet();
      appStore.walletKey = undefined;
      appStore.walletConnected = false;
    }
  });
  return (
    <div>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Tic Tac Toe</a>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              <button
                className={`btn btn-large btn-primary`}
                onClick$={
                  appStore.walletConnected ? handleDisconnect : handleConnect
                }
              >
                {appStore.walletConnected
                  ? 'Disconnect from wallet'
                  : 'Connect to wallet'}
              </button>
            </li>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
      </nav>
      <main>
        <Slot />
      </main>
    </div>
  );
});
