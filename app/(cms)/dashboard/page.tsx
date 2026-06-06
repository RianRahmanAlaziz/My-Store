import {
    Package,
    ShoppingBag,
    Users,
    Wallet,
} from "lucide-react";

const stats = [
    {
        title: "Total Products",
        value: "128",
        description: "Active products in catalog",
        icon: Package,
    },
    {
        title: "Total Orders",
        value: "342",
        description: "Orders this month",
        icon: ShoppingBag,
    },
    {
        title: "Total Customers",
        value: "1,204",
        description: "Registered customers",
        icon: Users,
    },
    {
        title: "Revenue",
        value: "Rp 48.5M",
        description: "Estimated monthly revenue",
        icon: Wallet,
    },
];

const recentOrders = [
    {
        invoice: "ORD-001",
        customer: "Rian Rahman",
        status: "Paid",
        total: "Rp 850.000",
    },
    {
        invoice: "ORD-002",
        customer: "Andi Saputra",
        status: "Pending",
        total: "Rp 420.000",
    },
    {
        invoice: "ORD-003",
        customer: "Siti Aminah",
        status: "Shipped",
        total: "Rp 1.250.000",
    },
];

export default function DashboardPage() {
    return (
        <>
            <div className="intro-y pt-8 sm:pt-24">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Welcome back! Here is your StepHub store overview.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="col-span-12 box p-5 sm:col-span-6 xl:col-span-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            {item.title}
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                            {item.value}
                                        </h2>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>

                                <p className="mt-4 text-xs text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 box p-5 lg:col-span-8">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Recent Orders
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b text-slate-500">
                                        <th className="whitespace-nowrap px-3 py-3 font-medium">
                                            Invoice
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 font-medium">
                                            Customer
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 font-medium">
                                            Status
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 text-right font-medium">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr
                                            key={order.invoice}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="whitespace-nowrap px-3 py-4 font-medium text-slate-700">
                                                {order.invoice}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-slate-600">
                                                {order.customer}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4">
                                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-right font-medium text-slate-700">
                                                {order.total}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-span-12 box p-5 lg:col-span-4">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Quick Actions
                        </h2>

                        <div className="mt-5 flex flex-col gap-3">
                            <a
                                href="/dashboard/products"
                                className="rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Manage Products
                            </a>
                            <a
                                href="/dashboard/orders"
                                className="rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                View Orders
                            </a>
                            <a
                                href="/dashboard/customers"
                                className="rounded-md border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Manage Customers
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}