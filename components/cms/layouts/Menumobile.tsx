"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, XCircle } from "lucide-react";

import Sidelink from "@/components/cms/common/Sidelink";
import { dashboardMenus } from "@/components/cms/layouts/dashboardMenus";

export default function Menumobile() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`mobile-menu md:hidden ${isOpen ? "mobile-menu--active" : ""}`}>
            <div className="mobile-menu-bar">
                <Link href="/dashboard" className="flex mr-auto items-center gap-2">
                    <Image
                        src="/images/logo.svg"
                        alt="StepHub"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                    />

                    <span className="font-semibold text-white">
                        StepHub CMS
                    </span>
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="mobile-menu-toggler"
                    aria-label="Open dashboard menu"
                >
                    <Menu className="h-8 w-8 text-white" />
                </button>
            </div>

            <div className="scrollable">
                <div className="flex justify-end px-4 py-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mobile-menu-toggler"
                        aria-label="Close dashboard menu"
                    >
                        <XCircle className="h-8 w-8 -rotate-90 text-white" />
                    </button>
                </div>

                <ul className="scrollable__content py-2">
                    {dashboardMenus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <Sidelink
                                key={menu.href}
                                title={menu.title}
                                href={menu.href}
                                icon={<Icon />}
                            />
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}