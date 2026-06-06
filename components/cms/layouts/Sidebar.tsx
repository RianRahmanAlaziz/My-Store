"use client";

import {
    BriefcaseBusiness,
    Building2,
    FolderKey,
    Folders,
    LayoutDashboard,
    Layers,
    MonitorCog,
    NotebookText,
    SquareUser,
    UserCog,
    Users,
    Weight,
} from "lucide-react";

import Sidelink from "@/components/cms/common/Sidelink";
import { dashboardMenus } from "./dashboardMenus";

export default function Sidebar() {
    return (
        <nav className="side-nav side-nav--simple">
            <ul>
                {dashboardMenus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <Sidelink
                            key={menu.href}
                            href={menu.href}
                            title={menu.title}
                            icon={<Icon />}
                        />
                    );
                })}
            </ul>
        </nav>
    );
}