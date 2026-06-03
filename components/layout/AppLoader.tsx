"use client";

import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export function AppLoader({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
}