import Typhography from "@/components/content/typhography";
import SignInForm from "@/components/forms/sign-in-form";
import WrapperContent from "@/components/wrapper-content";

export default function SignIn() {
  return (
    <WrapperContent>
      <Typhography kind="h1" className="text-center mb-8">
        Sign in
      </Typhography>
      <SignInForm />
    </WrapperContent>
  );
}
