import { DegreeResponse } from "@/types/admin";

export interface Credentials {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: UserTopic;
  userDegreePrograms: Degree[];
  userInformation: userInformation;
}

export interface User {
  email: string;
  password: string;
  roles: string[];
}

export type usersInformation = {
  name: string;
  fatherLastName: string;
  motherLastName: string;
};

export type UsersResponse = {
  id: string;
  email: string;
  roles: string[];
  userInformation: usersInformation;
};

export type UserTopic = {
  id: string;
  email: string;
  roles: string[];
};

type Degree = {
  id: string;
  name: string;
};

type Rol = {
  id: number;
  role: string;
  value: string;
};

export type EnableUserResponse = {
  id: string;
  userInformation: usersInformation;
};

export type userInformation = {
  id: number;
  address: string;
  fatherLastName: string;
  motherLastName: string;
  name: string;
  phoneNumber: string;
};

export type TopicUser = {
  user: UserTopic;
  userDegreePrograms: DegreeResponse[];
  userInformation: userInformation;
};

export type UserTopicResponse = {
  id: string;
} & usersInformation;
