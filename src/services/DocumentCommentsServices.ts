class DocumentCommentsServices {
  API_URL_COMMENTS = `${import.meta.env.VITE_API_URL}/topic-document-comments`;
  API_URL_COMMENTS_USERS = `${
    import.meta.env.VITE_API_URL
  }/topic-document-comments/users-that-commented`;
  API_URL_DOCUMENT_COMMENTS = `${
    import.meta.env.VITE_API_URL
  }/topic-document-comments/comments`;
  API_URL_DOCUMENT_COMMENTS_BY_USER = `${
    import.meta.env.VITE_API_URL
  }/topic-document-comments/comments-by-user`;

  async saveComment(token: string, comment: string, topicDocument: string) {
    const response = await fetch(this.API_URL_COMMENTS, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, topicDocument }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getComments(token: string, topicDocumentId: string) {
    const response = await fetch(
      `${this.API_URL_DOCUMENT_COMMENTS}/${topicDocumentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateComment(token: string, comment: string, id: string) {
    const response = await fetch(`${this.API_URL_COMMENTS}/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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

  async deleteComment(token: string, id: string) {
    const response = await fetch(`${this.API_URL_COMMENTS}/${id}`, {
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

  async getUsersThatComment(token: string, topicDocumentId: string) {
    const response = await fetch(
      `${this.API_URL_COMMENTS_USERS}/${topicDocumentId}`,
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

  async getCommentsByUser(token: string, topicDocumentId: string, userId: string) {
    const response = await fetch(
      `${this.API_URL_DOCUMENT_COMMENTS_BY_USER}/${topicDocumentId}?userId=${userId}`,
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
}

export default new DocumentCommentsServices();
