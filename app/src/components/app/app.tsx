import { component$, useClientEffect$, useStore } from '@builder.io/qwik';
import { getProvider } from '../../utils/connection';

import { Layout } from '../Layout/Layout';

export interface AppStore {
  showProvider: boolean;
  walletKey?: string;
  walletConnected: boolean;
}

export const App = component$(() => {
  const store = useStore<AppStore>({
    showProvider: false,
    walletConnected: false,
  });

  useClientEffect$(() => {
    const provider = getProvider();

    if (provider) {
      store.showProvider = true;
    }
  });

  return (
    <Layout appStore={store}>
      <header className="App-header">
        <h2>Tutorial: Connect to Phantom Wallet</h2>
        {store.showProvider && (
          <button className="btn btn-lrg">Connect to Phantom Wallet</button>
        )}

        {!store.showProvider && (
          <p>
            No provider found. Install{' '}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )}

        <p>
          Built by{' '}
          <a
            href="https://twitter.com/arealesramirez"
            target="_blank"
            rel="noreferrer"
            className="twitter-link"
          >
            @arealesramirez
          </a>
        </p>
      </header>
    </Layout>
  );
});
