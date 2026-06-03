import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/contexts/AuthContext";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </AuthProvider>
        </>
    );
}