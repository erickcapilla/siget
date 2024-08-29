import type { UserTopicResponse } from "@/types/user";
import type { AcceptedTopic } from "@/types/topic";

export type ReviewerResponse = {
  id: string;
  reviewerId: UserTopicResponse;
  topicId: string;
};

export type TopicReview = {
  reviewerId: UserTopicResponse;
  topic: AcceptedTopic & { graduationOpton: { id: string; name: strign } };
};
