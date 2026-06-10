import Link from "next/link";
import { LoaderCircle, Save } from "lucide-react";

type Props = {
    saving: boolean;
    onSubmit: () => void;
};

export default function ProductSubmitBar({ saving, onSubmit }: Props) {
    return (
        <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
            <Link href="/dashboard/products" className="btn py-3 border-slate-300 text-slate-500 w-full md:w-52">
                Cancel
            </Link>

            <button type="button" onClick={onSubmit} disabled={saving} className="btn py-3 btn-primary w-full md:w-52">
                {saving ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
            </button>
        </div>
    );
}
