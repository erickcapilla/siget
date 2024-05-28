import { Topic } from "@/types";

class TopicServices {
  API_URL_ALL_TOPICS = `${import.meta.env.VITE_API_URL}/topic/all-topics`;
  API_URL_USER_TOPICS = `${import.meta.env.VITE_API_URL}/topic/my-topics`;
  API_URL_TOPIC = `${import.meta.env.VITE_API_URL}/topic`;

  async saveTopic(token: string, topic: Topic) {
    const response = await fetch(this.API_URL_TOPIC, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateTopic(id: string, topic: Topic) {
    const response = await fetch(`${this.API_URL_TOPIC}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getTopics(token: string) {
    const response = await fetch(this.API_URL_ALL_TOPICS, {
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

  async getUserTopics(token: string) {
    const response = await fetch(this.API_URL_USER_TOPICS, {
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

  async deleteTopic(token: string, id: string) {
    const response = await fetch(`${this.API_URL_TOPIC}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (response.ok) {
      return response
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new TopicServices()