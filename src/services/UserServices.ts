import { Information } from "@/types";

class UserService {
  API_URL_USER_INFORMATION = `${import.meta.env.VITE_API_URL}/user-information`;
  API_URL_DEGREE = `${import.meta.env.VITE_API_URL}/degree-programs`;
  API_URL_USERS = `${import.meta.env.VITE_API_URL}/auth/users`;
  API_URL_ENABLE_USERS = `${import.meta.env.VITE_API_URL}/accepted-topics/students`;

  async getUser(id: string) {
    const response = await fetch(`${this.API_URL_USERS}/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getUsers() {
    const response = await fetch(this.API_URL_USERS, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })

    if(response.ok) {
      return response
    }

    const error = await response.json()

    throw new Error(error.message)
  }

  async editUser(id: string, data: object) {
    const response = await fetch(`${this.API_URL_USERS}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async deleteUser(id: string) {
    const response = await fetch(`${this.API_URL_USERS}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async setDegrees(userID: string, degrees: string[]) {
    const response = await fetch(
      `${this.API_URL_DEGREE}/${userID}/enroll-degree-programs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ degreeProgramsId: degrees }),
      }
    );

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async setInformation(token: string, information: Information) {
    const response = await fetch(this.API_URL_USER_INFORMATION, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(information),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async enableUsers(token: string) {
    const response = await fetch(this.API_URL_ENABLE_USERS, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }
}

export default new UserService();