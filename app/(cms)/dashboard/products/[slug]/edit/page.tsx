import ProductFormPage from "@/features/cms/products/components/ProductFormPage";

type EditProductPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { slug } = await params;

    return <ProductFormPage mode="edit" productId={slug} />;
}