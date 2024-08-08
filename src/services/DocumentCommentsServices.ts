class DocumentCommentsServices {
  API_URL_COMMENTS = `${import.meta.env.VITE_API_URL}/topic-document-comments`;
  API_URL_DOCUMENT_COMMENTS = `${import.meta.env.VITE_API_URL}/topic-document-comments/comments`;
  token = localStorage.getItem("siget") || "";

  async saveComment(comment: string, topicDocument: string) {
    const response = await fetch(this.API_URL_COMMENTS, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comment, topicDocument }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getComments(topicDocumentId: string) {
    console.log("Hola", topicDocumentId)
    const response = await fetch(`${this.API_URL_DOCUMENT_COMMENTS}/${topicDocumentId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateComment(comment: string, id: string) {
    const response = await fetch(`${this.API_URL_COMMENTS}/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteComment(id: string) {
    const response = await fetch(`${this.API_URL_COMMENTS}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${this.token}`,
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new DocumentCommentsServices();