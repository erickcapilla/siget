import { User } from "../types";
class AuthService {
  API_URL_LOGIN = `${import.meta.env.VITE_API_URL}/auth/login`;
  API_URL_REGISTER = `${import.meta.env.VITE_API_URL}/auth/register`;
  API_URL_FORGOT_PASSWORD = `${
    import.meta.env.VITE_API_URL
  }/auth/forgot-password`;
  API_URL_NEW_PASSWORD = `${import.meta.env.VITE_API_URL}/auth/reset-password`;
  API_URL_REFRESH_TOKEN = `${import.meta.env.VITE_API_URL}/auth/refresh-token`;
  API_URL_CHANGE_PASSWORD = `${
    import.meta.env.VITE_API_URL
  }/auth/change-password`;

  async login({ email, password }) {
    const response = await fetch(this.API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async register(token: string, user: User) {
    const response = await fetch(this.API_URL_REGISTER, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async sendEmailForgotPassword(token: string, email: string) {
    const response = await fetch(this.API_URL_FORGOT_PASSWORD, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async resetPassword(id: string, password: string) {
    const response = await fetch(`${this.API_URL_NEW_PASSWORD}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async refreshToken(token: string) {
    const response = await fetch(`${this.API_URL_REFRESH_TOKEN}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async changePassword(token: string, oldPassword: string, newPassword: string) {
    const response = await fetch(`${this.API_URL_CHANGE_PASSWORD}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new AuthService();
