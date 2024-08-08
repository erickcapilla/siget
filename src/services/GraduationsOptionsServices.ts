class GraduationsOptionsServices {
  API_URL_OPTIONS = `${import.meta.env.VITE_API_URL}/graduation-options`;

  async saveOption(name: string) {
    const response = await fetch(this.API_URL_OPTIONS, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name })
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.menssage)
  }

  async getOptions() {
    const response = await fetch(this.API_URL_OPTIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }

  async getOption(id: string) {
    const response = await fetch(`${this.API_URL_OPTIONS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }

  async deleteOption(id: string) {
    const response = await fetch(`${this.API_URL_OPTIONS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })

    if(response.ok) return response

    const error = await response.json()

    throw new Error(error.message)
  }
}

export default new GraduationsOptionsServices()