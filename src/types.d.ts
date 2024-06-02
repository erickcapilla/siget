export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  password?: string;
  email?: string;
  roles?: string[];
  userInformation: Information;
}

export type Information = {
  id?: number;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  phoneNumber?: string;
  address?: string;
};

export type Degree = {
  id: string;
  name: string;
};

export type UserResponse = {
  user: User;
  userDegreePrograms: Degree[];
  userInformation: Information;
};

export interface Topic {
  title: string;
  description: string;
  degreeProgram: string;
  graduationOption: string;
  collaborator?: string;
}

export interface TopicResponse {
  id: string;
  title: string;
  description: string;
  degreeProgram?: Degree;
  graduationOption?: Option;
  collaborator?: User;
  proposedBy?: User;
  proposedByRole: string
}

//export type TopicResponse = Topic & { id: string; proposedBy: User; proposedByRole: string };

export type Option = {
  id: string;
  name: string;
};

export interface Options {
  id: number;
  name: string;
  description: string;
}

export interface Steps {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface RequestTopic {
  id: string;
  isAccepted: boolean;
  topic: TopicResponse;
}

export interface PetitionTopic {
  id: string;
  isAccepted: boolean;
  requestedBy: User;
  topic: TopicResponse;
}