import "@/components/cms/styles/css/app.css"

import Menumobile from "@/components/cms/layouts/Menumobile";
import Switcher from "@/components/cms/layouts/Switcher";
import Topbar from "@/components/cms/layouts/Topbar";
import Sidebar from "@/components/cms/layouts/Sidebar";


export default function CMSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="cms theme-1 min-h-screen py-5 md:py-5 md:pr-5">
                <Menumobile />
                <Topbar />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    <div className="content">
                        {children}
                    </div>
                </div>
                <Switcher />
            </div>
            <div id="modal-root" />
        </>
    );
}