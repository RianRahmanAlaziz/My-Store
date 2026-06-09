import OrderDetailPage from "@/features/cms/orders/components/OrderDetailPage";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;

    return <OrderDetailPage orderId={id} />;
}