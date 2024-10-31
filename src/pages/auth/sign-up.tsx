import Typhography from "@/components/content/typhography";
import SignUpForm from "@/components/forms/sign-up-form";
import WrapperContent from "@/components/wrapper-content";

export default function SignUp() {
  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-8">
        Sign up
      </Typhography>
      <SignUpForm />
    </WrapperContent>
  );
}
