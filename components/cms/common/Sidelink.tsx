"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Tippy from "@tippyjs/react";
import { roundArrow } from "tippy.js";
import { ChevronDown } from "lucide-react";

import "tippy.js/dist/tippy.css";
import "tippy.js/dist/svg-arrow.css";

interface SidelinkProps {
    icon?: React.ReactNode;
    title: string;
    href?: string;
    children?: React.ReactNode;
    cls?: string;
}

interface CloseAllSidelinksEvent extends CustomEvent {
    detail: string;
}

export default function Sidelink({
    icon,
    title,
    href = "/",
    children,
    cls = "",
}: SidelinkProps) {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const hasChildren = React.Children.count(children) > 0;

    const isChildActive = useMemo(() => {
        if (!hasChildren) return false;

        return React.Children.toArray(children).some((child) => {
            if (!React.isValidElement<SidelinkProps>(child)) return false;

            const childHref = child.props.href;

            return typeof childHref === "string" && pathname.startsWith(childHref);
        });
    }, [children, hasChildren, pathname]);

    const isDirectActive =
        href === "/dashboard"
            ? pathname === href
            : Boolean(href && pathname.startsWith(href));
    const isActive = isDirectActive || isChildActive;

    useEffect(() => {
        if (isActive && hasChildren) {
            setIsOpen(true);
        }
    }, [isActive, hasChildren]);

    useEffect(() => {
        const checkResponsive = (): void => {
            const mobile = window.innerWidth <= 768;
            const collapsed =
                !mobile &&
                (window.innerWidth <= 1260 ||
                    document
                        .querySelector(".side-nav")
                        ?.classList.contains("side-nav--simple") === true);

            setIsMobile(mobile);
            setIsCollapsed(collapsed);
        };

        checkResponsive();

        window.addEventListener("resize", checkResponsive);

        return () => {
            window.removeEventListener("resize", checkResponsive);
        };
    }, []);

    useEffect(() => {
        const handleCloseAll = (event: Event): void => {
            const customEvent = event as CloseAllSidelinksEvent;

            if (customEvent.detail !== title) {
                setIsOpen(false);
            }
        };

        window.addEventListener("closeAllSidelinks", handleCloseAll);

        return () => {
            window.removeEventListener("closeAllSidelinks", handleCloseAll);
        };
    }, [title]);

    const baseClass = isMobile ? "menu" : "side-menu";

    const fullClass = [
        baseClass,
        cls,
        isActive ? "side-menu--active" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        if (!hasChildren) return;

        event.preventDefault();

        window.dispatchEvent(
            new CustomEvent("closeAllSidelinks", {
                detail: title,
            })
        );

        setIsOpen((prev) => !prev);
    };

    return (
        <li>
            <Tippy
                content={title}
                arrow={roundArrow}
                placement="right"
                animation="shift-away"
                disabled={!isCollapsed}
                delay={[0, 100]}
            >
                <Link
                    href={hasChildren ? "#" : href}
                    onClick={hasChildren ? handleClick : undefined}
                    className={fullClass}
                >
                    <div className={`${baseClass}__icon`}>{icon}</div>

                    <motion.div className={`${baseClass}__title`} layout>
                        {title}

                        {hasChildren && (
                            <ChevronDown
                                className={`${baseClass}__sub-icon transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        )}
                    </motion.div>
                </Link>
            </Tippy>

            {hasChildren && (
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={`overflow-hidden ${baseClass}__sub-open mb-3`}
                        >
                            {children}
                        </motion.ul>
                    )}
                </AnimatePresence>
            )}
        </li>
    );
}