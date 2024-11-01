import Typhography from "@/components/content/typhography";
import EditPostForm from "@/components/forms/edit-post-form";
import WrapperContent from "@/components/wrapper-content";
import useGetPost from "@/hooks/use-get-post";
import { useParams } from "react-router-dom";

export function EditPost() {
  const { postId = "" } = useParams();
  const { data, error, isLoading } = useGetPost(postId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-10">
        Edit post
      </Typhography>

      <EditPostForm post={data} />
    </WrapperContent>
  );
}
