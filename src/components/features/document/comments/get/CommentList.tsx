import { CommentItem } from "./CommentItem";
import { Comment } from "@/types";

interface Props {
  comments: Comment[];
}

export const CommentList = ({ comments }: Props) => {

  return (
    <>
      {comments.map((comment) => (
        <CommentItem />
      ))}
    </>
  );
};
