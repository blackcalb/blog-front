import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "@/components/inputs/input";
import Button from "@/components/inputs/button";
import useAuth from "@/hooks/use-auth";
import { SchemaSignIn, SigninFormDTO } from "@/schemas/auth";
import useSignIn from "@/hooks/use-sign-in";

export function SignInForm() {
  const navigate = useNavigate();

  const { updateToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormDTO>({
    resolver: zodResolver(SchemaSignIn),
  });
  const [globalError, setGlobalError] = useState<string>();
  const loginUser = useSignIn({
    async onSuccess(data: Response) {
      const body = await data.json();
      if (data.status === 200) {
        updateToken(body.auth_token);
        navigate("/");
        return;
      } else {
        setGlobalError(body.message);
      }
    },
  });

  const onSubmit = (data: SigninFormDTO) => {
    loginUser.mutate(data);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        label="Email"
        placeholder="Introduce your email"
        required
        error={errors.email?.message}
      />

      <Input
        {...register("password")}
        label="Password"
        placeholder="Type your password ********"
        type="password"
        required
        error={errors.password?.message}
      />

      {globalError && <p className="text-red-500 text-xs">{globalError}</p>}

      <Button type="submit">Sign in</Button>
    </form>
  );
}
