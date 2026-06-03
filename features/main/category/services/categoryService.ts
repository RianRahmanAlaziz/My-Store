import { axiosInstance } from "@/lib/axios";

export async function getCategories() {
    const response = await axiosInstance.get("/categories");

    return response.data;
}