import { axiosInstance } from "@/lib/axios";

export async function getBrands() {
    const response = await axiosInstance.get("/brands");

    return response.data;
}