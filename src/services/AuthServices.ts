import { User } from "../types";
class AuthService {
  API_URL_LOGIN = `${import.meta.env.VITE_API_URL}/auth/login`;
  API_URL_REGISTER = `${import.meta.env.VITE_API_URL}/auth/register`;

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

  async register(user: User) {
    const response = await fetch(this.API_URL_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      return response;
    }

    throw new Error("Register failed");
  }
}

export default new AuthService();
