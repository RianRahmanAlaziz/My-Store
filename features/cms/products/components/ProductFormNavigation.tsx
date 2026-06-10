import { useEffect, useState } from "react";

const sections = [
    { id: "product-information", label: "Product Information" },
    { id: "upload-product", label: "Upload Product" },
    { id: "product-detail", label: "Product Detail" },
    { id: "product-variant", label: "Product Variant" },
    { id: "product-management", label: "Product Management" },
];

type Props = {
    loading: boolean;
};

export default function ProductFormNavigation({ loading }: Props) {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveSection(id);
    };

    useEffect(() => {
        if (loading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.3, rootMargin: "-120px 0px -50% 0px" }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [loading]);

    return (
        <div className="hidden 2xl:block">
            <div className="fixed right-8 top-40 z-50 w-56 shadow-lg">
                <div className="box p-5">
                    <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:h-full before:absolute before:left-0 before:z-[-1]">
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`mb-4 cursor-pointer border-l-2 pl-5 transition-all duration-200 ${
                                    activeSection === section.id
                                        ? "border-primary text-primary font-medium"
                                        : "border-transparent hover:text-primary"
                                }`}
                            >
                                {section.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
