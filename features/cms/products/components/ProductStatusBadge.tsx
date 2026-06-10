import { CheckSquare } from "lucide-react";

type Props = {
    active: boolean;
};

export default function ProductStatusBadge({ active }: Props) {
    return active ? (
        <div className="flex items-center justify-center text-primary">
            <CheckSquare className="mr-2 h-4 w-4" />
            Active
        </div>
    ) : (
        <div className="flex items-center justify-center text-danger">
            <CheckSquare className="mr-2 h-4 w-4" />
            Inactive
        </div>
    );
}
