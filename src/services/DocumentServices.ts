class DocumentServices {
  API_URL_FILE = `${import.meta.env.VITE_API_URL}/files`;
  API_URL_CHAPTER = `${import.meta.env.VITE_API_URL}/files/complete-chapter`;

  async uploadFile(token: string, file: File, id: string) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.API_URL_FILE}/upload-topic?acceptedTopicId=${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateFile(token: string, file: File, id: string) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.API_URL_FILE}/update-topic?topic-document=${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getUrlDocument(token: string, id: string) {
    const response = await fetch(`${this.API_URL_FILE}/document/${id}.pdf`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getUserDocuments(token: string) {
    const response = await fetch(`${this.API_URL_FILE}/my-documents`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getStudentDocument(token: string, id: string) {
    const response = await fetch(`${this.API_URL_FILE}/student-document/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateChapter(token: string, chapter: number, id: string) {
    const response = await fetch(`${this.API_URL_CHAPTER}/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({chapter}),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new DocumentServices();