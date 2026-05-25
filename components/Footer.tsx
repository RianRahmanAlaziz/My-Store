import Link from "next/link";
import {
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Button } from "@/components/ui/Button";

export default function Footer() {
    const shopLinks = [
        { name: "All Shoes", href: "/catalog" },
        { name: "Running", href: "/catalog?category=running" },
        { name: "Lifestyle", href: "/catalog?category=lifestyle" },
        { name: "Casual", href: "/catalog?category=casual" },
    ];

    const supportLinks = [
        { name: "Help Center", href: "/" },
        { name: "Shipping Info", href: "/" },
        { name: "Return Policy", href: "/" },
        { name: "Privacy Policy", href: "/" },
    ];

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--card)]">
            <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-xl font-bold text-[var(--primary-foreground)]">
                                S
                            </div>

                            <div>
                                <h2 className="text-xl font-black text-[var(--foreground)]">
                                    StepHub
                                </h2>
                                <p className="text-sm text-[var(--muted)]">
                                    Modern Shoes Store
                                </p>
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted)]">
                            Temukan sepatu modern dengan kualitas premium untuk running,
                            lifestyle, casual, dan kebutuhan harian kamu.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <SocialButton icon={<FaFacebook className="h-5 w-5" />} />
                            <SocialButton icon={<FaInstagram className="h-5 w-5" />} />
                            <SocialButton icon={<FaTwitter className="h-5 w-5" />} />
                        </div>
                    </div>

                    <FooterLinks title="Shop" links={shopLinks} />

                    <FooterLinks title="Support" links={supportLinks} />

                    <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                            Contact
                        </h3>

                        <div className="mt-5 flex flex-col gap-4">
                            <ContactItem
                                icon={<MapPin className="h-5 w-5" />}
                                text="Jakarta, Indonesia"
                            />
                            <ContactItem
                                icon={<Phone className="h-5 w-5" />}
                                text="+62 812 3456 7890"
                            />
                            <ContactItem
                                icon={<Mail className="h-5 w-5" />}
                                text="support@stephub.com"
                            />
                        </div>

                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)] md:flex-row">
                    <p>© 2026 StepHub. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/" className="hover:text-[var(--accent)]">
                            Terms
                        </Link>
                        <Link href="/" className="hover:text-[var(--accent)]">
                            Privacy
                        </Link>
                        <Link href="/" className="hover:text-[var(--accent)]">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLinks({
    title,
    links,
}: {
    title: string;
    links: { name: string; href: string }[];
}) {
    return (
        <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">{title}</h3>

            <div className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]">
            {icon}
        </button>
    );
}

function ContactItem({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) {
    return (
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)] text-[var(--foreground)]">
                {icon}
            </div>

            <span>{text}</span>
        </div>
    );
}