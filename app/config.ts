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
        projectId: 'YOUR_PROJECT_ID', // ⚠️ Make sure your ID is here
    }
);

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http(),
    },
    connectors,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});