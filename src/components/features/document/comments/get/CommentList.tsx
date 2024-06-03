import { CommentItem } from "./CommentItem";
import { Comment, CommentResponse } from "@/types";

interface Props {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<CommentResponse>>;
}

export const CommentList = ({ comments, setComments }: Props) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} setComments={setComments} />
      ))}
    </>
  );
};
