import { CommentItem } from "./CommentItem";
import { CommentResponse } from "@/types/topic";

interface Props {
  comments: CommentResponse[];
  setComments: React.Dispatch<React.SetStateAction<CommentResponse[]>>;
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
