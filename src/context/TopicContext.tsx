import { createContext } from "react";
import { useState, useEffect } from "react";
import { TopicResponse, Topic, RequestTopic, PetitionTopic } from "@/types";
import topicServices from "@/services/TopicServices";
import requestTopicServices from "@/services/RequestTopicServices";
import { useAuth } from "@/hooks";

type TopicContext = {
  setTopics: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
  setUserTopics: React.Dispatch<React.SetStateAction<TopicResponse[]>>;
  getTopics: () => Promise<void>;
  getUserTopics: () => Promise<void>;
  getRequestTopics: () => Promise<void>;
  getPetitionsTopics: () => Promise<void>;
  saveTopic: (topic: Topic) => Promise<void>;
  deleteTopic: (id: string) => Promise<void>;
  topics: TopicResponse[];
  userTopics: TopicResponse[];
  userRequests: RequestTopic[];
  userPetitions: PetitionTopic[];
  loading: boolean;
};

export const TopicContext = createContext<TopicContext>({
  getTopics: async () => {},
  getUserTopics: async () => {},
  getRequestTopics: async () => {},
  getPetitionsTopics: async () => {},
  saveTopic: async () => {},
  deleteTopic: async () => {},
  setTopics: () => {},
  setUserTopics: () => {},
  topics: [],
  userTopics: [],
  userRequests: [],
  userPetitions: [],
  loading: false,
});

interface Props {
  children: React.ReactNode;
}

export const TopicProvider = ({ children }: Props) => {
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [userTopics, setUserTopics] = useState<TopicResponse[]>([]);
  const [userRequests, setUserRequests] = useState<RequestTopic[]>([]);
  const [userPetitions, setUserPetitions] = useState<PetitionTopic[]>([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const getTopics = async () => {
    setLoading(true);
    try {
      const res = await topicServices.getTopics(token);
      const data = await res.json();
      setTopics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserTopics = async () => {
    setLoading(true);
    try {
      const res = await topicServices.getUserTopics(token);
      const data = await res.json();
      setUserTopics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRequestTopics = async () => {
    setLoading(true);
    try {
      const res = await requestTopicServices.getUserRequests(token);
      const r = await requestTopicServices.getAcceptedTopics(token);
      const data = await res.json();
      const d = await r.json();
      setUserRequests(data);
      console.log(d)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getPetitionsTopics = async () => {
    setLoading(true);
    try {
      const res = await requestTopicServices.getUserPetitions(token);
      const data = await res.json();
      setUserPetitions(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const saveTopic = async (topic: Topic) => {
    try {
      const res = await topicServices.saveTopic(token, topic);
      const data = await res.json()
      return data
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTopic = async (id: string) => {
    try {
      await topicServices.deleteTopic(token, id);
      setTopics((prev) => prev.filter((topic) => topic.id !== id));
      setUserTopics((prev) => prev.filter((topic) => topic.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTopics()
  }, [])

  return (
    <TopicContext.Provider
      value={{
        getTopics,
        saveTopic,
        topics,
        userTopics,
        setTopics,
        setUserTopics,
        loading,
        getUserTopics,
        deleteTopic,
        getRequestTopics,
        userRequests,
        getPetitionsTopics,
        userPetitions,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};
