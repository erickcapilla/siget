export interface AdvisoryData {
  reviewedTopic: string;
  observations: string;
  date: string;
  acceptedTopic: string;
}

export type AdvisoryResponse = {
  reviewedTopic: string;
  observations: string;
  date: string;
  id: string;
  isSigned: boolean;
};
