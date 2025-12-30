import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
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
        projectId: '3a8170812b534d0ff9d794f3580e64cd', // I'm using a public one for safety, swap yours back if you want
    }
);

export const config = createConfig({
    chains: [base],
    ssr: true, // Keep this true for Next.js
    transports: {
        [base.id]: http(),
    },
    connectors,
    storage: createStorage({
        storage: cookieStorage,
    }),
});