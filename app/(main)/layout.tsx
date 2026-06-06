import "@/app/globals.css";
import Navbar from "@/components/main/layouts/Navbar";
import Footer from "@/components/main/layouts/Footer";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { AppLoader } from "@/components/main/layouts/AppLoader";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AuthProvider>
                <AppLoader>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </AppLoader>
            </AuthProvider>
        </div>
    );
}