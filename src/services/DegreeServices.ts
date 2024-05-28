class DegreeServices {
  API_URL_DEGREE = `${import.meta.env.VITE_API_URL}/degree-programs`;

  async getDegrees() {
    const response = await fetch(this.API_URL_DEGREE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response
    }
    
    const error = await response.json()

    throw new Error(error.message);
  }

  async saveDegree(name: string) {
    const response = await fetch(this.API_URL_DEGREE, {
      method: "POST",
      headers: {
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
}

export default new DegreeServices()