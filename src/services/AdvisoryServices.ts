import { AdvisoryData } from "@/types/advisory";

class AdvasoryServices {
  API_URL_ADVISORY = `${import.meta.env.VITE_API_URL}/advisory-sessions`;

  async saveAdvisory(token: string, advisory: AdvisoryData) {
    const response = await fetch(this.API_URL_ADVISORY, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
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

  async getAdvisories(token: string, topicId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/accepted-topic/${topicId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async signAdvisory(token: string, advisoryId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/sign-up/${advisoryId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteAdvisory(token: string, advisoryId: string) {
    const response = await fetch(`${this.API_URL_ADVISORY}/${advisoryId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
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