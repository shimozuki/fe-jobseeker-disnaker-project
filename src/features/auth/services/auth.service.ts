import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { LoginDto, RegisterDto } from "../types/authDto.type";

export async function register(data: RegisterDto) {
  try {
    const formData = new FormData();
    formData.append("nik", data.nik);
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("account_type", data.account_type);
    formData.append("terms_accepted", data.terms_accepted ? "true" : "false");
    formData.append(
      "privacy_accepted",
      data.privacy_accepted ? "true" : "false",
    );
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, formData);

    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function login(data: LoginDto) {
  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, formData);
    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function verifyEmail(token: string) {
  try {
    return await axios.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { params: { token } });
  } catch (error: any) {
    return handleServiceError(error);
  }
}

export async function resendVerification(email: string) {
  try {
    return await axios.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
  } catch (error: any) {
    return handleServiceError(error);
  }
}

export async function forgotPassword(email: string) {
  try {
    return await axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  } catch (error: any) {
    return handleServiceError(error);
  }
}

export async function resetPassword(data: {
  token: string;
  new_password: string;
}) {
  try {
    return await axios.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  } catch (error: any) {
    return handleServiceError(error);
  }
}

export async function me(token: string) {
  try {
    const response = await axios.get(API_ENDPOINTS.AUTH.ME, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      status: response.status,
      message: response.statusText,
      data: response.data,
    };
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function logout(token: string) {
  try {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.LOGOUT,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function resendVerification(email: string) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      formData,
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}
