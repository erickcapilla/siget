import type { usersInformation } from "@/types/user";

export interface AppointmentData {
  topic: string;
  location: string;
  date: string;
  time: string;
  participants: string[];
  invitee: string;
}

export type AppointmentResponse = {
  id: string;
  date: string;
  invitee: usersInformation & { user: { id: string } };
  location: string;
  participants: usersInformation & { user: { id: string } }[];
  requester: usersInformation & { user: { id: string } };
  status: "PENDING" | "ACCEPTED";
  topic: string;
  time: string;
}