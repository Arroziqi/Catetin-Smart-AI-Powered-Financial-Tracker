import { ENDPOINT } from "@/lib/common/const/endpoint";
import { api } from "@/lib/common/services/api";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
};

export async function loginService(
    payload: LoginPayload
): Promise<LoginResponse> {
    const response = await api.post(ENDPOINT.AUTH.LOGIN, payload);

    return response.data;
}