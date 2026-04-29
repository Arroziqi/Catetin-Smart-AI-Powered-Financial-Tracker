import { ENDPOINT } from "@/lib/common/const/endpoint";
import { api } from "@/lib/common/services/api";

type RegisterPayload = {
    email: string;
    password: string;
};

type RegisterResponse = {
    message?: string;
    data?: unknown;
};

export async function registerService(
    payload: RegisterPayload
): Promise<RegisterResponse> {
    const response = await api.post(ENDPOINT.AUTH.REGISTER, payload, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    return response.data;
}