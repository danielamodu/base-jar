import { http, createConfig, cookieStorage, createStorage } from 'wagmi'
import { base } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, rainbowWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [rainbowWallet, metaMaskWallet, coinbaseWallet],
        },
    ],
    {
        appName: 'BaseJar',
        projectId: 'YOUR_PROJECT_ID', // Get one at https://cloud.walletconnect.com (optional for now)
    }
);

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http(),
    },
    connectors,
    // 👇 THIS IS THE FIX: Use cookieStorage instead of local/indexedDB
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true, // Tells wagmi we are running on server
})