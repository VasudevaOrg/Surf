import axios from 'axios';
import {API_ENDPOINTS, AUTH_HEADER} from '../config/ApiConfig';

export const googleLogin = async (
  email: string,
  firstname: string,
  lastname: string,
) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.NT_GOOGLE_USER_API,
      {
        email,
        firstname,
        lastname,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error('Error during Google login API call:', error);
    return {
      result: false,
      message:
        error.response?.data?.message ||
        'Failed to authenticate with Google backend',
    };
  }
};

export const sendWhatsAppOtp = async (phoneNumber: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.NT_OTP_LOGIN_API,
      {
        destination: phoneNumber,
        verification_method: 'phone',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error sending WhatsApp OTP:', error);
    return {
      generated_otp: null,
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

export const verifyWhatsAppOtp = async (phoneNumber: string, otp: string) => {
  try {
    const response = await axios.put(
      API_ENDPOINTS.NT_OTP_VERIFY_API,
      {
        phone: phoneNumber,
        verification_method: 'phone',
        otp: otp,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error verifying WhatsApp OTP:', error);
    return {
      result: false,
      message: error.response?.data?.message || 'Failed to verify OTP',
    };
  }
};

export const sendWhatsAppOtpForSignup = async (phoneNumber: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.NT_OTP_REG_API,
      {
        destination: phoneNumber,
        verification_method: 'phone',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error sending WhatsApp OTP for signup:', error);
    return {
      generated_otp: null,
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

export const verifyWhatsAppOtpForSignup = async (
  phoneNumber: string,
  otp: string,
) => {
  try {
    const response = await axios.put(
      API_ENDPOINTS.NT_OTP_VERIFY_API_V2,
      {
        phone: phoneNumber,
        verification_method: 'phone',
        otp: otp,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error verifying WhatsApp OTP for signup:', error);
    return {
      result: false,
      message: error.response?.data?.message || 'Failed to verify OTP',
    };
  }
};

export const sendEmailOtpForSignup = async (email: string) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS.NT_OTP_REG_EMAIL_API,
      {
        destination: email,
        verification_method: 'email',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error sending Email OTP for signup:', error);
    return {
      generated_otp: null,
      message: error.response?.data?.message || 'Failed to send OTP',
    };
  }
};

export const verifyEmailOtpForSignup = async (email: string, otp: string) => {
  try {
    const response = await axios.put(
      API_ENDPOINTS.NT_OTP_VERIFY_EMAIL_API(1),
      {
        email: email,
        verification_method: 'email',
        otp: otp,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error verifying Email OTP for signup:', error);
    return {
      is_verifield: false,
      result: false,
      message: error.response?.data?.message || 'Failed to verify OTP',
    };
  }
};

export const createAccountV2 = async (data: {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  phone_verified?: string;
  nt_email_verify?: string;
}) => {
  try {
    const response = await axios.post(API_ENDPOINTS.NT_SIGNUP_API_V2, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: AUTH_HEADER,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating account V2:', error);
    return {
      result: false,
      message: error.response?.data?.message || 'Failed to create account',
    };
  }
};
