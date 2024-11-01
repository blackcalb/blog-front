import Typhography from "@/components/content/typhography";
import CreateNewPostForm from "@/components/forms/create-new-post-form";
import WrapperContent from "@/components/wrapper-content";

export default function NewPost() {
  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-10">
        Create new post
      </Typhography>
      <CreateNewPostForm />
    </WrapperContent>
  );
}
