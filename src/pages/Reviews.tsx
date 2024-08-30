import { useState, useEffect } from "react";
import reviewerServices from "@/services/ReviewerServices";
import { useAuth } from "@/hooks";
import { ReviewerTopicsTable, Panel } from "@/components/features";
import { Spinner } from "@nextui-org/react";
import { TopicReview } from "@/types/reviewer";
import { LayoutMain } from "@/layouts";

export const Reviews = () => {
  const [reviews, setReviews] = useState<TopicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewerServices.getTopicByReviewer(
          token,
          user.user.id
        );
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <LayoutMain>
      <Panel title="Temas asignados">
        {loading ? (
          <Spinner />
        ) : reviews.length > 0 ? (
          <ReviewerTopicsTable reviews={reviews} />
        ) : (
          <p>No hay temas asignados</p>
        )}
      </Panel>
    </LayoutMain>
  );
};
