import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { AppLoader } from "@/components/layout/AppLoader";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AuthProvider>
                <AppLoader>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </AppLoader>
            </AuthProvider>
        </>
    );
}