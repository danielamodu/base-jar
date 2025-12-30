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
        projectId: 'YOUR_PROJECT_ID',
    }
);

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http(),
    },
    connectors,
    ssr: true, // <--- CRITICAL: This tells wagmi to behave on the server
    storage: createStorage({
        storage: cookieStorage, // <--- CRITICAL: This replaces the crashing database
    }),
})