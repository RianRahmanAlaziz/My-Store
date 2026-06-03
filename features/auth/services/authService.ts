import { axiosInstance } from "@/lib/axios";

export type LoginPayload = {
    email: string;
    password: string;
};

export async function login(payload: LoginPayload) {
    const response = await axiosInstance.post("/login", payload);

    return response.data;
}