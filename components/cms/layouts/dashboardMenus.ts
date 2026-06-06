import {
    BadgeInfo,
    LayoutDashboard,
    Package,
    Shapes,
    ShoppingBag,
    Users,
} from "lucide-react";

export const dashboardMenus = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Categories",
        href: "/dashboard/categories",
        icon: Shapes,
    },
    {
        title: "Brands",
        href: "/dashboard/brands",
        icon: BadgeInfo,
    },
    {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingBag,
    },
    {
        title: "Customers",
        href: "/dashboard/customers",
        icon: Users,
    },
];