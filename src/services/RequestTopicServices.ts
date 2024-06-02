class RequestTopicServices {
  API_URL_TOPIC_REQUEST = `${import.meta.env.VITE_API_URL}/topic-request`;
  API_URL_TOPIC_ACCEPT = `${import.meta.env.VITE_API_URL}/topic-request/accept-my-petition/`;
  API_URL_USER_PETITIONS = `${import.meta.env.VITE_API_URL}/topic-request/my-petitions`;
  API_URL_USER_REQUESTS = `${import.meta.env.VITE_API_URL}/topic-request/my-requests`;
  API_URL_DELETE_PETITION = `${import.meta.env.VITE_API_URL}/topic-request/reject-a-petition/`;
  API_URL_ACCEPTED_TOPICS = `${import.meta.env.VITE_API_URL}/accepted-topics`;

  async createRequestTopic(token: string, id: string) {
    const response = await fetch(this.API_URL_TOPIC_REQUEST, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: id }),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async acceptPetition(token: string, id: string) {
    const response = await fetch(this.API_URL_TOPIC_ACCEPT + id, {
      method: "PATCH",
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

  async getUserPetitions(token: string) {
    const response = await fetch(this.API_URL_USER_PETITIONS, {
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

  async getUserRequests(token: string) {
    const response = await fetch(this.API_URL_USER_REQUESTS, {
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

  async getAcceptedTopics(token: string) {
    const response = await fetch(this.API_URL_ACCEPTED_TOPICS, {
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

  async deletePetition(token: string, id: string) {
    const response = await fetch(this.API_URL_DELETE_PETITION + id, {
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

export default new RequestTopicServices();