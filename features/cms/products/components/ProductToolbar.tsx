import Link from "next/link";
import { Plus, Search } from "lucide-react";

type Props = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

export default function ProductToolbar({ searchTerm, setSearchTerm }: Props) {
    return (
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <Link href="/dashboard/products/create" className="btn btn-primary flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
            </Link>

            <div className="hidden md:block mx-auto text-slate-500" />

            <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                <div className="w-56 relative text-slate-500">
                    <input
                        type="text"
                        className="form-control w-56 box pr-10"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" />
                </div>
            </div>
        </div>
    );
}
