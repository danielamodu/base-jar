'use client';

import React, { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // While waiting for browser, show a simple loading screen or nothing
    if (!mounted) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading BaseJar...</div>;
    }

    // Once loaded, show the app
    return <>{children}</>;
}