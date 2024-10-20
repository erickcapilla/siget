import { Topic } from "@/types";

class TopicServices {
  API_URL_ALL_TOPICS = `${import.meta.env.VITE_API_URL}/topic/all-topics`;
  API_URL_USER_TOPICS = `${import.meta.env.VITE_API_URL}/topic/my-topics`;
  API_URL_TOPIC = `${import.meta.env.VITE_API_URL}/topic`;
  API_URL_ACCEPTED_TOPIC = `${import.meta.env.VITE_API_URL}/accepted-topics`;
  API_URL_ALL_ACCEPTED_TOPIC = `${
    import.meta.env.VITE_API_URL
  }/accepted-topics/get-by-degree-program`;
  API_URL_FINISH_TOPIC = `${
    import.meta.env.VITE_API_URL
  }/accepted-topics/finish-topic`;
  API_URL_FINISED_TOPICS = `${
    import.meta.env.VITE_API_URL
  }/accepted-topics/get-finished-topics`;
  API_URL_LEAVE_TOPIC = `${import.meta.env.VITE_API_URL}/accepted-topics/abandon`;
  API_URL_LEAVE_TOPICS = `${import.meta.env.VITE_API_URL}/abandoned-topic/get-by-degree-program`;
  API_URL_LEAVE_TOPIC_ASESOR = `${import.meta.env.VITE_API_URL}/abandoned-topic`;

  async saveTopic(token: string, topic: Topic) {
    const response = await fetch(this.API_URL_TOPIC, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateTopic(token: string, id: string, topic: Topic) {
    const response = await fetch(`${this.API_URL_TOPIC}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: topic.title,
        description: topic.description,
        graduationOption: topic.graduationOption,
      }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getTopics(token: string) {
    const response = await fetch(this.API_URL_ALL_TOPICS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getUserTopics(token: string) {
    const response = await fetch(this.API_URL_USER_TOPICS, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteTopic(token: string, id: string) {
    const response = await fetch(`${this.API_URL_TOPIC}/${id}`, {
      method: "DELETE",
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

  async updateAcceptedTopic(token: string, id: string, topic: Topic) {
    const response = await fetch(`${this.API_URL_ACCEPTED_TOPIC}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: topic.title,
        description: topic.description,
        graduationOption: topic.graduationOption,
      }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getAllAcceptedTopics(token: string, degree: string[]) {
    const response = await fetch(this.API_URL_ALL_ACCEPTED_TOPIC, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ degree }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getAcceptedTopic(token: string, id: string) {
    const response = await fetch(`${this.API_URL_ACCEPTED_TOPIC}/${id}`, {
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

  async finishAcceptedTopic(token: string, id: string) {
    const response = await fetch(`${this.API_URL_FINISH_TOPIC}/${id}`, {
      method: "POST",
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

  async getFinishedTopics(token: string, degree: string[]) {
    const response = await fetch(this.API_URL_FINISED_TOPICS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ degree }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async leaveTopic (token: string, id: string) {
    const response = await fetch(`${this.API_URL_LEAVE_TOPIC}/${id}`, {
      method: "DELETE",
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

  async getLeftTopics (token: string, degree: string[]) {
    const response = await fetch(this.API_URL_LEAVE_TOPICS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ degree }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getLeftTopicAsesor (token: string) {
    const response = await fetch(`${this.API_URL_LEAVE_TOPIC_ASESOR}/get-by-assessor`, {
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

  async deleteLeftTopic (token: string, id: string) {
    const response = await fetch(`${this.API_URL_LEAVE_TOPIC_ASESOR}/${id}`, {
      method: "DELETE",
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
}

export default new TopicServices();
