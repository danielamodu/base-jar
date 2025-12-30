import { http, createConfig } from 'wagmi';
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
        projectId: '1586e06e2bb4ca5b2797983ad4a0b008', // 👈 REPLACE THIS!
    }
);

export const config = createConfig({
    chains: [base],
    transports: {
        [base.id]: http(),
    },
    connectors,
});