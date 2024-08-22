import { Appointment } from "@/types";
class ScheduleServices {
  API_URL_SCHEDULE = `${import.meta.env.VITE_API_URL}/schedule`;
  API_URL_REQUEST_SCHEDULE = `${
    import.meta.env.VITE_API_URL
  }/schedule/my-request`;
  API_URL_PETITION_SCHEDULE = `${
    import.meta.env.VITE_API_URL
  }/schedule/my-petition`;

  async createAppointment(token: string, appointment: Appointment) {
    const response = await fetch(this.API_URL_SCHEDULE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async getRequestAppointment(token: string) {
    const response = await fetch(this.API_URL_REQUEST_SCHEDULE, {
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

  async getPetitionAppointment(token: string) {
    const response = await fetch(this.API_URL_PETITION_SCHEDULE, {
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

  async acceptAppointment(token: string, id: string) {
    const response = await fetch(`${this.API_URL_SCHEDULE}/${id}/accept`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "ACCEPTED" }),
    });

    if (response.ok) {
      return response;
    }

    const error = await response.json();

    throw new Error(error.message);
  }

  async rejectAppointment(token: string, id: string) {
    const response = await fetch(`${this.API_URL_SCHEDULE}/${id}/reject`, {
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

export default new ScheduleServices();
