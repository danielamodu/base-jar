'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Providers = dynamic(
    () => import('./providers').then((mod) => mod.Providers),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                Loading BaseJar...
            </div>
        ),
    }
);

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
    return <Providers>{children}</Providers>;
}
