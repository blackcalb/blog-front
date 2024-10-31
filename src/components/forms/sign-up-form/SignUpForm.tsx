import Button from "@/components/inputs/button";
import Input from "@/components/inputs/input";
import useSignUp from "@/hooks/use-sign-up";
import { SchemaSignUp, SignupFormDTO } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function SignUpForm() {
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormDTO>({
    resolver: zodResolver(SchemaSignUp),
  });
  const createUser = useSignUp({
    async onSuccess(data: Response) {
      const body = await data.json();
      if (data.status === 201) {
        navigate("/auth/sign-in");
        return;
      } else if (data.status === 400) {
        switch (body.code) {
          case "weak_password":
            setError("password", { message: body.message });
            return;
          case "user_already_exists":
            setError("email", { message: body.message });
            return;
          default:
            setGlobalError(body.message);
            return;
        }
      }
    },
  });

  const onSubmit = (data: SignupFormDTO) => {
    setGlobalError(undefined);
    createUser.mutate(data);
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        label="Email"
        placeholder="Type your email"
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        label="Password"
        error={errors.password?.message}
      />

      {globalError && <p>There was a problem, please try later</p>}
      <Button type="submit">Sign up</Button>
    </form>
  );
}
