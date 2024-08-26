import { UserTopic, EnableUserResponse, UserTopicResponse } from "@/types/user";
import { DegreeResponse, GraduationResponse } from "@/types/admin";

export interface TopicData {
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
  proposedByRole: string
  proposedBy: UserTopic;
  degreeProgram: DegreeResponse;
  graduationOption: GraduationResponse;
  collaborator: UserTopic;
}

export type RequestTopic = {
  id: string;
  isAccepted: boolean;
  topic: TopicResponse;
}

export type PetitionTopic = {
  id: string;
  isAccepted: boolean;
  requestedBy: EnableUserResponse & {id: string};
  topic: TopicResponse;
}

export type AcceptedTopic = {
  id: string;
  description: string;
  collaborator: UserTopicResponse;
  title: string;
  acceptedBy: UserTopicResponse; 
  requestedBy: UserTopicResponse; 
}

export type CommentResponse = {
  id: string;
  comment: string;
  date: string;
}

export type DocumentResponse = {
  id: string;
  chapter1: boolean;
  chapter2: boolean;
  chapter3: boolean;
  chapter4: boolean;
  chapter5: boolean;
  chapter6: boolean;
  chapter7: boolean;
  url: string;
}