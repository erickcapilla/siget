class DocumentServices {
  API_URL_FILE = `${import.meta.env.VITE_API_URL}/files`;
  API_URL_CHAPTER = `${import.meta.env.VITE_API_URL}/files/complete-chapter`;
  token = localStorage.getItem("siget") || "";

  async uploadFile(file: File, id: string) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.API_URL_FILE}/upload-topic?acceptedTopicId=${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async updateFile(file: File, id: string) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.API_URL_FILE}/update-topic?topic-document=${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getUrlDocument(id: string) {
    const response = await fetch(`${this.API_URL_FILE}/document/${id}.pdf`, {
      method: "GET",
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

  async getUserDocuments() {
    const response = await fetch(`${this.API_URL_FILE}/my-documents`, {
      method: "GET",
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

  async updateChapter(chapter: number, id: string) {
    const response = await fetch(`${this.API_URL_CHAPTER}/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${this.token}`,
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