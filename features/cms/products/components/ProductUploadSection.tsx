import { ImageIcon, X } from "lucide-react";
import FormRow from "./FormRow";
import FormSection from "./FormSection";

type Props = {
    previews: string[];
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (index: number) => void;
};

export default function ProductUploadSection({ previews, handleImageChange, removeImage }: Props) {
    return (
        <FormSection id="upload-product" title="Upload Product" className="mt-5">
            <FormRow title="Product Photos" badge="Required" description="Upload maksimal 5 gambar product.">
                <div className="w-full border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                        {previews.map((preview, index) => (
                            <div key={`${preview}-${index}`} className="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in">
                                <img src={preview} alt="Preview" className="rounded-md h-full w-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        <span className="text-primary mr-1">Upload a file</span>
                        or drag and drop
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full h-full top-0 left-0 absolute opacity-0" />
                    </div>
                </div>
            </FormRow>
        </FormSection>
    );
}
