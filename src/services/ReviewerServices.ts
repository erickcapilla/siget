class ReviewerServices {
  API_URL_REVIEWER = `${import.meta.env.VITE_API_URL}/topic-reviewer`;
  API_URL_REVIEWER_BY_TOPIC = `${
    import.meta.env.VITE_API_URL
  }/topic-reviewer/by-topic`;

  async setReviewer(token: string, topicId: string, reviewerId: string) {
    const response = await fetch(this.API_URL_REVIEWER, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topicId, reviewerId }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getReviewerByTopic(token: string, topicId: string) {
    const response = await fetch(
      `${this.API_URL_REVIEWER_BY_TOPIC}/${topicId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteReviewer(token: string, id: string) {
    const response = await fetch(`${this.API_URL_REVIEWER}/${id}`, {
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

export default new ReviewerServices();
