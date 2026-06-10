import { Plus } from "lucide-react";

type Props = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    openAddModal: () => void;
};

export default function BrandToolbar({
    searchTerm,
    setSearchTerm,
    openAddModal,
}: Props) {
    return (
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button
                type="button"
                onClick={openAddModal}
                className="btn btn-primary shadow-lg"
            >
                <Plus className="pr-1.5" /> Brand
            </button>

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
                </div>
            </div>
        </div>
    );
}