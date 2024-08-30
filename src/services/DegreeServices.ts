class DegreeServices {
  API_URL_DEGREE = `${import.meta.env.VITE_API_URL}/degree-programs`;

  async getDegrees(token: string) {
    const response = await fetch(this.API_URL_DEGREE, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }
    
    const error = await response.json()

    throw new Error(error.message);
  }

  async saveDegree(token: string, name: string) {
    const response = await fetch(this.API_URL_DEGREE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json()

    throw new Error(error.message);
  }

  async updateDegree(token: string, id: string, name: string) {
    const response = await fetch(`${this.API_URL_DEGREE}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json()

    throw new Error(error.message);
  }

  async deleteDegree(token: string, id: string) {
    const response = await fetch(`${this.API_URL_DEGREE}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }

    const error = await response.json()

    throw new Error(error.message);
  }
}

export default new DegreeServices()