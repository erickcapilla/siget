import type { UserTopicResponse } from "@/types/user";

export type ReviewerResponse = {
  id: string;
  reviewerId: UserTopicResponse;
  topicId: string;
};