class GraduationsOptionsServices {
  API_URL_OPTIONS = `${import.meta.env.VITE_API_URL}/graduation-options`;

  async saveOption(token: string, name: string) {
    const response = await fetch(this.API_URL_OPTIONS, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.menssage)
  }

  async getOptions(token: string) {
    const response = await fetch(this.API_URL_OPTIONS, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }

  async getOption(token: string, id: string) {
    const response = await fetch(`${this.API_URL_OPTIONS}/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }

  async deleteOption(token: string, id: string) {
    const response = await fetch(`${this.API_URL_OPTIONS}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }
}

export default new GraduationsOptionsServices()