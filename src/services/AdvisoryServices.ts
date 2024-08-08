import { Advisory } from "@/types";

class AdvasoryServices {
  API_URL_ADVISORY = `${import.meta.env.VITE_API_URL}/advisory-sessions`;
  token = localStorage.getItem("siget") || "";

  async saveAdvisory(advisory: Advisory) {
    const response = await fetch(this.API_URL_ADVISORY, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(advisory),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getAdvisories(topicId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/accepted-topic/${topicId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async signAdvisory(advisoryId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/sign-up/${advisoryId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteAdvisory(advisoryId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/${advisoryId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new AdvasoryServices()